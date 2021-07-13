import { Express } from "express";
import { db } from "../../db/db";

export class Get {
	constructor(express: Express) {
		express.post("/v1/plan/get", async (req, res) => {
			const _plans = await db.Plans.Get();

			res.status(200);
			res.send({
				code: 200,
				error: false,
				message: "All The Listed Plans",
				payload: {
					plans: _plans,
				},
			});
		});
	}
}
