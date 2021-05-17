import { Router } from "express";

import users from "./users";
import geolocalisations from "./geolocalisations";
import chats from "./chats";

const api = Router();

api.use("/users", users);
api.use("/geolocalisations", geolocalisations);
//api.use("/chats", chats);

export default api;
