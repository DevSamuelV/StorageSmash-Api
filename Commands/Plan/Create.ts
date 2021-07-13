import { MinecraftPlan } from "@prisma/client";
import { Express } from "express";
import { db } from "../../db/db";

export class Create {
	constructor(express: Express) {
		express.post("/v1/plan/create", async (req, res) => {
			const _plan: MinecraftPlan = req.body.plan || null;

			// For Now
			return res.status(404).send();

			if (_plan != null) {
				const _result = await db.Plans.Get();

				res.status(200);
				return res.send({
					error: false,
					code: 200,
					message: "Created Plan Successfuly",
					payload: {
						plan: _result,
					},
				});
			}

			return res.status(500).send();
		});
	}
}
