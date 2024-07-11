import axios from "axios";
import image from "./assets/ORH8S60.jpg";

import { useState, useRef } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

function App() {
  const [preferenceId, setPreferenceId] = useState(null);

  // const publicKey = import.meta.env.VITE_PUBLIC_KEY_TEST
  const publicKey = import.meta.env.VITE_PUBLIC_KEY;

  const paymentField = useRef(null)

  initMercadoPago(publicKey, {
    locale: "es-AR",
  });

  const createPreference = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/create-preference",
        {
          products: [
            {
              name: "Smartphone Android v24",
              quantity: 1,
              price: 12,
              currency: "ARS",
              description: 'Smartphone Android v24, 2 GB RAM, 256 GB memory, 48px cam',
              image: null
            },
          ],
        }
      );

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  const getPaymentInfo = async (e) => {
    e.preventDefault()
    const id = paymentField.current.value

    try {
      const response = await axios.post("http://localhost:3000/get-payment", {
        paymentID: id,
      });

      console.log(response.data);
    } catch (error) {
      console.log('No se ha podido encontrar la operación con ese número ❌');
      console.log(error);
    }
  };

  return (
    <>
      <h1>
        Prueba de Mercado<span className='pago-word'>Pago</span>
      </h1>
      <div className='card-container'>
        <strong>Smartphone Android v24</strong>
        <img src={image} alt='Foto de un smartphone con un fondo blanco' />
        <p>
          Precio: <strong>$10.000</strong>
        </p>
        <div className='quantity-container'>
          <p>Cantidad:</p>
          <div className='buttons'>
            <button>-</button>
            <input
              type='number'
              name='quantity'
              id='quantity'
              defaultValue={1}
            />
            <button>+</button>
          </div>
        </div>
        <button className='pay-button' onClick={handleBuy}>
          Pagar
        </button>
        {preferenceId && (
          <Wallet
            initialization={{ preferenceId: preferenceId, redirectMode: "blank" }}
            customization={{ texts: { valueProp: "smart_option" } }}
          />
        )}
      </div>
      <div>
        <h3>Obtener información del pago</h3>
        <form>
          <input
            type='text'
            name='paymentnum'
            id='paymentnum'
            placeholder='Ingresa tu número de operación'
            ref={paymentField}
          />
          <button type="submit" onClick={getPaymentInfo}>Obtener información</button>
        </form>
      </div>
    </>
  );
}

export default App;
