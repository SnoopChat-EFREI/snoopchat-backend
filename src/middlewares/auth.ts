import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import dotenv from "dotenv";
dotenv.config();

export function generateAccessToken(
  username: string,
  id: string,
  locId: number
) {
  return jwt.sign({ username, id, locId }, process.env.TOKEN_SECRET, {
    expiresIn: "3600s",
  });
}

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      console.log("::ERROR ", err);

      if (err) return res.sendStatus(403);

      req.user = user;

      next();
    }
  );
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function compare(password: string, hashed: string) {
  return await bcrypt.compare(password, hashed);
}
