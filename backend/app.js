import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import customerRoutes from "./src/routers/customer.js";
import employeerRoutes from "./src/routers/employees.js";
import adminRoutes from "./src/routers/admin.js";
import cartRoutes from "./src/routers/cart.js";
import finanzaRoutes from "./src/routers/finanza.js";
import historialRoutes from "./src/routers/historial.js";
import productRoutes from "./src/routers/productos.js";
import registerAdminRoutes from "./src/routers/registerAdmin.js";
import registeremployeerRoutes from "./src/routers/registerEmployeer.js";
import registerCustomerRoutes from "./src/routers/registerCustomer.js";
import ventaRoutes from "./src/routers/venta.js";
import reviewRoutes from "./src/routers/review.js";





const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    // permitir el envío de cookies y credenciales
    credentials: true,
  }),
);

app.use(limiter)

app.use(cookieParser());

//Que acepte los json desde postman
app.use(express.json());

app.use("/api/customer", customerRoutes);
app.use("/api/employeer", employeerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/finanza", finanzaRoutes);
app.use("/api/historial", historialRoutes);
app.use("/api/product", productRoutes);
app.use("/api/registerAdmin", registerAdminRoutes);
app.use("/api/registerEmployeer", registeremployeerRoutes);
app.use("/api/registerCustomer", registerCustomerRoutes);
app.use("/api/venta", ventaRoutes);
app.use("/api/review", reviewRoutes);


export default app;