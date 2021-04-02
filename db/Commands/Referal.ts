import {} from "date-fns";
import { Controller } from "../Controller";

export class Referal {
  public Create = (code: string, expires: string) =>
    new Promise(async (resolve) => {
      const result = await Controller.prisma.referal.create({
        data: {
          expires: expires,
          code: code,
        },
      });

      resolve(result);
    });

  public Get = (code: string) =>
    new Promise(async (resolve) => {
      const count = await Controller.prisma.referal.count();

      if (count == null || count == 0) return;

      const result = await Controller.prisma.referal.findUnique({
        where: {
          code: code,
        },
      });

      resolve(result);
    });
}
