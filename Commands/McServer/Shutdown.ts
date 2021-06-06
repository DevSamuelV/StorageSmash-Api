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
				const _isShuttingDown = Services.minecraft
					.Shutdown(serverId, token)
					.catch((_err) => {
						res.status(500);
						return res.send({
							error: true,
							code: 500,
							message: _err.message,
						});
					});

				console.log(_isShuttingDown);

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

			// res.status(401);

			// return res.send({
			// 	error: true,
			// 	code: 401,
			// 	message: "You Do Not Own that server",
			// });
		});
	}
}
