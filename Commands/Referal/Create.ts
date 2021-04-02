import { addDays } from "date-fns";
import { Express } from "express";
import { db } from "../../db/db";
import { Response } from "../../types/Request";

export class Create {
  constructor(express: Express) {
    express.post("/v1/CreateReferal", async (req, res: Response) => {
      if (req.body.code == null || req.body.expiresin)
        return res.send({
          error: true,
          code: 400,
          message: "Please Define Proper Parms",
        });

      const code: string = req.body.code;
      const expires: string = req.body.days;

      const result = await db.Referal.Create(
        code,
        addDays(new Date(), Number(expires)).toISOString()
      );

      if (result != null)
        return res.send({
          error: false,
          code: 200,
          message: "Referal Created",
        });

      return res.send({
        error: true,
        code: 500,
        message: "Could Not Create a Referal",
      });
    });
  }
}
