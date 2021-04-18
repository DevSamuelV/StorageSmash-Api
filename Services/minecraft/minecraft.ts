import { MinecraftServer } from "@prisma/client";
import axios from "axios";
import { db } from "../../db/db";
import { IMcServerReq } from "../../types/MinecraftServer";

export class Minecraft {
	public Create = (server: IMcServerReq) =>
		new Promise<boolean | null>(async (resolve) => {
			// remove this later this is for testing
			resolve(true);

			const req = axios.post("/v1/CreateServer", { server: server });

			req.then((res) => {
				console.log(res);
				resolve(true);
			});
			req.catch((err) => {
				console.log(err);

				resolve(false);
			});

			resolve(true);
		});

	public Startup = (id: string) =>
		new Promise((resolve) => {
			const req = axios.post("/v1/StartServer", { id: id });

			req.then((res) => console.log(res));
			req.catch((err) => console.log(err));

			resolve(null);
		});

	public Shutdown = (id: string) =>
		new Promise((resolve) => {
			const req = axios.post("/v1/ShutdownServer", { id: id });

			req.then((res) => console.log(res));
			req.catch((err) => console.log(err));

			resolve(null);
		});

	public Delete = (id: string) =>
		new Promise((resolve) => {
			const req = axios.post("/v1/DeleteServer", { id: id });

			req.then((res) => console.log(res));
			req.catch((err) => console.log(err));

			resolve(null);
		});
}
