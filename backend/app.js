import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routers
import customersRouter from "./src/routers/customers.js";
import reviewsRouter from "./src/routers/reviews.js";
import historialRouter from "./src/routers/historial.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    // permitir el envío de cookies y credenciales
    credentials: true,
  }),
);

app.use(cookieParser());

//Que acepte los json desde postman
app.use(express.json());

// Rutas
app.use("/api/customers", customersRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/historial", historialRouter);

export default app;