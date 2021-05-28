import express from "express";
import cors from "cors";
import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";

import {
  compare,
  generateAccessToken,
  hashPassword,
  authenticateToken,
} from "./middlewares/auth";
import routes from "./routes";
import { injectPrisma } from "./middlewares/inject-prisma";

export function launch(port: number): void {
  const application = express();

  /* Middlewares */
  application.use(express.json());
  application.use(express.urlencoded({ extended: true }));
  application.use(injectPrisma());
  application.use(cors());

  /* Routes */
  application.use("/", routes);

  application.post("/login", async ({ prisma, body }, res) => {
    try {
      if (!body.username || !body.password) {
        return res.status(400).end();
      }

      const user = await prisma.user.findUnique({
        where: {
          pseudo: body.username,
        },
      });

      if (!user) {
        return res.status(401).json({ error: "invalid username" });
      }
      const { password } = user;

      if (!(await compare(body.password, password))) {
        return res.status(401).json({ error: "wrong password" });
      }
      const token = generateAccessToken(
        body.username,
        user.id,
        user.geolocalisationId
      );
      res.status(200).json({
        token,
      });
    } catch (error) {
      console.log(error);
    }
  });

  application.post("/register", async ({ prisma, body }, res) => {
    try {
      const { firstName, lastName, pseudo, eMail, password } = body;
      if (!firstName || !lastName || !pseudo || !eMail || !password) {
        return res.status(400).end();
      }
      const hashed = await hashPassword(password);
      await prisma.user.create({
        data: {
          firstName,
          lastName,
          pseudo,
          eMail,
          password: hashed,
          picture: "null",
        },
      });
      const userCreated = await prisma.user.findUnique({
        where: {
          pseudo, 
        },
      });
      console.log(":: NOUV USER : ", userCreated);

      const geo = await prisma.geolocalisation.create({
        data: {
          coordonate: "",
          display: true,
          user: {
            connect: { id: userCreated.id },
          },
        },
      });
      console.log(geo);

      const friend = await prisma.friend.create({
        data: {
          user: {
            connect: { id: userCreated.id },
          },
        },
      });
      console.log(friend);

      res.status(200).end();
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == "P2002") {
          res.status(401).json({ error: "username or email already used" });
        }
      }
      res.status(500).end();
    }
  });

  application.get("/auth", (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      return res.status(401).end();
    }

    jwt.verify(
      token,
      process.env.TOKEN_SECRET as string,
      (err: any, user: any) => {
        console.log(err);

        if (err) return res.status(403).end();
        res.status(200).json(true);
      }
    );
  });

  application.listen(port, () => {
    console.log(`Server started at: http://localhost:${port}`);
  });
}
