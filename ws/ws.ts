import { Express } from "express";
import { Server } from "socket.io";
import { Services } from "../Services/Services";
import { Token } from "../security/token";
import { Security } from "../security/Security";

export class ws {
	private serve: Server = new Server({
		cors: { origin: "*" },
		path: "/realtime",
	});

	constructor() {
		this.serve.listen(2345);

		console.warn("WS: INIT");

		this.serve.on("connection", (socket) => {
			socket.on("RCON-GET-LOGS", async (res) => {
				const serverId = res.serverId;
				const token = res.token;

				if (token == null || serverId == null) return;

				const result = await Token.Check(token);

				if (!result.allow || result.uid == null) return;

				// connect the user to a channel for the specific server
				socket.join(serverId);

				// check if the user owns this server
				const doesOwn = await Security.User.DoesOwn.Server(
					serverId,
					result.uid
				);

				if (!doesOwn) {
					return socket.to(serverId).emit("RCON-REQUEST-ERROR", {
						message: "This User Does Not Own the Server",
					});
				}

				const logs = await Services.minecraft.GetLogs(serverId, token);

				console.log(logs);

				if (logs.error) {
					return socket.to(serverId).emit("RCON-REQUEST-ERROR", {
						message: logs.message,
					});
				}

				socket.to(serverId).emit("RCON-GET-LOGS-REPLY", { logs: logs });
			});
		});
	}
}
