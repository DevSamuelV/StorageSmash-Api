import { Express } from "express";
import { db } from "../../db/db";
import { Response } from "../../types/Request";

export class Get {
  constructor(express: Express) {
    express.post("/v1/GetServers", async (req, res: Response) => {
      if (req.body.uid == null)
        return res.send({
          error: true,
          code: 500,
          message: "Please Define uid",
        });

      const uid = req.body.uid;

      const doc = await db.mc.Get(uid);

      if (doc != null) {
        return res.send({
          error: false,
          code: 200,
          message: "Server Retreved",
          payload: {
            servers: doc,
          },
        });
      }

      return res.send({
        error: true,
        code: 500,
        message: "Could Not Retreve the Server",
      });
    });
  }
}
