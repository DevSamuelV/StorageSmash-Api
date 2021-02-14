import { PrismaClient } from "@prisma/client";

export class Controller {
  static prisma = new PrismaClient();
}
