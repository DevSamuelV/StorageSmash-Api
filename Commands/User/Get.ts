import { Express } from "express";
import { db } from "../../db/db";

export class Usr_Get {
  constructor(express: Express) {
    express.post("/v1/GetUser", async (req, res) => {
      if (req.body.uid == null)
        return res.send({
          error: true,
          code: 500,
          message: "Please Define Uid",
        });

      const uid = req.body.uid;
      const user = await db.user.Get(uid);

      if (user == null) {
        return res.send({
          error: true,
          code: 500,
          message: "User Not Found",
        });
      }

      return res.send({
        error: false,
        code: 500,
        message: "User retreved",
        payload: {
          user: user,
        },
      });
    });
  }
}
