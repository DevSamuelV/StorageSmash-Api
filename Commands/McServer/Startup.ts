import { Express } from "express";
import { db } from "../../db/db";
import { Security } from "../../security/Security";
import { Services } from "../../Services/Services";
import { Response } from "../../types/Request";

export class Startup {
	constructor(express: Express) {
		express.post("/v1/ServerStartup", async (req, res: Response) => {
			if (req.body.serverId == null) {
				res.status(400);

				res.send({
					message: "Missing Argument serverId",
					code: 400,
					error: true,
				});
			}

			if (req.body.uid == null) {
				res.status(400);

				res.send({
					message: "Missing Argument uid",
					code: 400,
					error: true,
				});
			}

			const token: string = req.header("Authorization")!;
			const serverId: string = req.body.serverId;
			const uid: string = req.body.uid;
			const doesOwn = await Security.User.DoesOwn.Server(serverId, uid).catch(
				(_err) => {
					return res.send({
						error: true,
						code: 500,
						message: _err.message,
					});
				}
			);

			if (doesOwn) {
				const _isStarting = await Services.minecraft
					.Startup(serverId, token)
					.catch((_err) => {
						console.error(_err);

						res.status(500);
						return res.send({
							code: 500,
							message: "Server Not Starting Unknown error",
							error: true,
						});
					});

				if (_isStarting) {
					const _updatedServer = await db.mc
						.ChangeStatus(serverId, true)
						.catch((_err) => {
							console.error(_err);

							res.status(500);
							return res.send({
								code: 500,
								message: "Server Status Failed To Update Unknown error",
								error: true,
							});
						});

					res.status(200);
					res.send({
						error: true,
						code: 200,
						message: "Server Is Starting Up!",
						payload: {
							server: _updatedServer,
						},
					});
				}
			}
		});
	}
}
