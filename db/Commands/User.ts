import { IUser } from "../../types/User";
import { Controller } from "../Controller";

export class User {
  public Get = (uid: string) =>
    new Promise<IUser | null>(async (resolve) => {
      const doc = await Controller.prisma.user.findUnique({
        where: {
          uid: uid,
        },
      });

      resolve(doc);
    });

  public Create = (user: IUser) =>
    new Promise<IUser>(async (resolve) => {
      const doc = await Controller.prisma.user.create({
        data: user,
      });

      resolve(doc);
    });

  public Edit = (user: IUser) =>
    new Promise(async (resolve) => {
      const doc = await Controller.prisma.user.update({
        where: {
          uid: user.uid,
        },
        data: user,
      });

      resolve(doc);
    });
}
