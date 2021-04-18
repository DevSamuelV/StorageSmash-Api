import { Express } from "express";
import { Response } from "../../types/Request";
import { db } from "../../db/db";

export class ChangeStatus {
	constructor(express: Express) {
		express.post("/v1/ChangeStatus", async (req, res: Response) => {
			if (req.body.serverId == null)
				return res.send({
					error: true,
					code: 400,
					message: "Please Define Server Id",
				});

			const data: { serverId: string; status: boolean } = req.body.data;
			const result = await db.mc.ChangeStatus(data.serverId, data.status);

			if (result != null) {
				return res.send({
					code: 200,
					error: false,
					message: "Status Changed",
					payload: {
						server: result,
					},
				});
			}

			return res.send({
				code: 500,
				error: true,
				message: "Status Not Changed",
			});
		});
	}
}
