import { Router } from "express";
import { authenticateToken } from "../middlewares/auth";
import api from "./api";

const routes = Router();
// routes.use("/api", api);
routes.use("/api", authenticateToken, api);

export default routes;
