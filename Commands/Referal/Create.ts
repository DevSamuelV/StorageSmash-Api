import { addDays } from "date-fns";
import { Express } from "express";
import { db } from "../../db/db";
import { Response } from "../../types/Request";

export class Create {
	constructor(express: Express) {
		// any user can use this make sure that only admins can use it
		express.post("/v1/CreateReferal", async (req, res: Response) => {
			if (req.body.code == null)
				return res.send({
					error: true,
					code: 400,
					message: "Please Define Proper Parms",
				});

			const code: string = req.body.code;
			const expires: string = req.body.days;
			const percent: number = req.body.percent;

			const result = await db.Referal.Create(
				code,
				addDays(new Date(), Number(expires || 10)).toISOString(),
				percent
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
