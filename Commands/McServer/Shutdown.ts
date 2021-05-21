import { Express } from "express";
import { db } from "../../db/db";
import { Security } from "../../security/Security";
import { Services } from "../../Services/Services";
import { Response } from "../../types/Request";

export class Shutdown {
	constructor(express: Express) {
		express.post("/v1/ServerShutdown", async (req, res: Response) => {
			if (req.body.serverId == null) {
				return res.send({
					code: 500,
					message: "Please Define Server Id",
					error: true,
				});
			}

			if (req.body.uid == null) {
				return res.send({
					code: 500,
					message: "Please Define uid",
					error: true,
				});
			}

			const serverId = req.body.serverId;
			const uid = req.body.uid;

			const token = req.body.token;
			const isOwner = await Security.User.DoesOwn.Server(serverId, uid);

			if (isOwner) {
				const _isShuttingDown = await Services.minecraft.Shutdown(
					serverId,
					token
				);

				if (_isShuttingDown) {
					const statusChange = await db.mc.ChangeStatus(serverId, false);

					return res.send({
						code: 200,
						error: false,
						message: "Server is Shutting Down!",
						payload: {
							isShuttingdown: _isShuttingDown,
							status: statusChange,
						},
					});
				}

				return res.send({
					code: 500,
					error: true,
					message: "Server is not Shutting Down!",
				});
			}
		});
	}
}
