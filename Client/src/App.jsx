import { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

import image from "./assets/ORH8S60.jpg";

function App() {
  const [preferenceId, setPreferenceId] = useState(null);
  console.log(preferenceId);

  const publicKey = import.meta.env.VITE_PUBLIC_KEY_TEST;

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
              title: "Smartphone Android v24",
              quantity: 1,
              price: 5000,
              currency: "ARS",
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
            initialization={{ preferenceId: preferenceId }}
            customization={{ texts: { valueProp: "smart_option" } }}
          />
        )}
      </div>
    </>
  );
}

export default App;
