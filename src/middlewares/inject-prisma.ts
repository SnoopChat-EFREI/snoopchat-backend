import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { stringify } from "node:querystring";

export function injectPrisma() {
  const prisma = new PrismaClient();

  return (request: Request, response: Response, next: NextFunction) => {
    request.prisma = prisma;
    next();
  };
}
