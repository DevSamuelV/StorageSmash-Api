import { Express } from "express";
import { db } from "../../db/db";
import { Services } from "../../Services/Services";
import {
	IMcServer,
	IMcServerReq,
	ServerProperties,
} from "../../types/MinecraftServer";

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
			const token: string = req.body.token;

			const instance = await Services.minecraft.Create(server, token);

			const payload: IMcServer = {
				gamemode: server.gamemode,
				ip: "play.storagesmash.com",
				maxPlayers: server.maxPlayers,
				memory: server.memory,
				name: server.name,
				online: false,
				serverImage: "java",
				uid: server.uid,
				serverId: instance.data.ServerId,
				rconPort: instance.data.RconPort,
				port: instance.data.ServerPort | 0,
				world: server.world || ServerProperties.NO_WORLD,
				seed: server.seed || ServerProperties.NO_SEED,
			};

			const doc = await db.mc.Create(payload);

			if (instance.data.ServerId == null) {
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
				message: "Error Could Not Create a Server",
			});
		});
	}
}
