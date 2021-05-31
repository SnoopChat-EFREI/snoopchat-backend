import { Router } from "express";


import users from "./users";
import friends from "./friends";
import geolocalisations from "./geolocalisations";
import chats from "./chats";
import messages from "./messages"

const api = Router();

api.use("/users", users);
api.use("/friends", friends);
api.use("/geolocalisations", geolocalisations);
api.use("/chats", chats);
api.use("/messages", messages);

export default api;
