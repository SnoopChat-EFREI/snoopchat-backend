import { Router } from "express";

import users from "./users";
import geolocalisations from "./geolocalisations";

const api = Router();

api.use("/users", users);
api.use("/geolocalisations", geolocalisations);

export default api;
