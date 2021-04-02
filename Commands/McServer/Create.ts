import { Express } from "express";
import { db } from "../../db/db";
import { Services } from "../../Services/Services";
import { IMcServerReq } from "../../types/MinecraftServer";

export class Create {
	constructor(express: Express) {
		express.post("/v1/CreateServer", async (req, res) => {
			if (req.body.server == null)
				return res.send({
					error: true,
					code: 500,
					message: "Server Not Defined",
				});

			const server: IMcServerReq = req.body.server;

			const doc = await db.mc.Create(server);
			const serverCreated = await Services.minecraft.Create(server);

			if (serverCreated == false) {
				const queue = await db.mc.AddToQueue(server);

				return res.send({
					error: false,
					code: 303,
					message: "Added Your Server To The Queue",
					payload: {
						server: queue,
					},
				});
			}

			if (doc.serverId != null) {
				return res.send({
					error: false,
					code: 201,
					message: "Server Created",
					payload: {
						server: doc,
					},
				});
			}

			return res.send({
				error: false,
				code: 500,
				message: "Error Could Not Create a User",
			});
		});
	}
}
