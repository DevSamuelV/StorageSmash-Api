import { Express } from "express";
import { db } from "../../db/db";
import { Response } from "../../types/Request";
import { IUser } from "../../types/User";

export class Usr_Create {
  constructor(express: Express) {
    express.post("/v1/CreateUser", async (req, res: Response) => {
      if (req.body.user == null)
        return res.send({
          error: true,
          code: 500,
          message: "User Not Defined",
        });

      const user: IUser = req.body.user;

      if (user.username == null || user.email == null || user.photoURL == null)
        return res.send({
          error: true,
          code: 500,
          message: "user info fragmented",
        });

      const doc = await db.user.Create(user);

      if (doc.uid != null) {
        return res.send({
          error: false,
          code: 201,
          message: "User Created",
          payload: {
            user: doc,
            created: true,
          },
        });
      }

      return res.send({
        error: false,
        code: 500,
        message: "Error Could Not Create a User",
        payload: {
          created: true,
        },
      });
    });
  }
}
