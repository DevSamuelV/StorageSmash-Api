import { Express } from "express";
import { db } from "../../db/db";
import { Response } from "../../types/Request";

export class Check {
	constructor(express: Express) {
		express.post("/v1/CheckCode", async (req, res: Response) => {
			if (req.body.code == null)
				return res.send({
					code: 400,
					error: true,
					message: "Please Define code",
				});

			const code: string = req.body.code;

			const result = await db.Referal.Get(code);

			if (result != null)
				return res.send({
					code: 200,
					error: false,
					message: "Referal Retrived",
					payload: {
						referal: result,
					},
				});

			return res.send({
				error: true,
				code: 500,
				message: "Referal Not Retrevied",
			});
		});
	}
}
