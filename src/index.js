import express from "express";
import cors from 'cors'
import paymentRoutes from "./routes/payment.routes.js";
import { PORT } from "./config.js";

// Inicializamos nuestra app ejecutando Express.
const app = express();

app.use(cors());
app.use(express.json());


// Rutas del pago.
app.use(paymentRoutes);

// Le decimos a la aplicación que "escuche" (que se inicie) en el puerto 3000 y ponemos un console.log para que la terminal nos lo indique.
app.listen(PORT);
console.log("Server on port", PORT);