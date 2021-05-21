import { IMcServer, IMcServerReq } from "../../types/MinecraftServer";
import { v4 } from "uuid";
import { Controller } from "../Controller";

export class McServer {
	public Get = (uid: string) =>
		new Promise<IMcServer[] | null>(async (resolve) => {
			const docs = await Controller.prisma.minecraftServer.findMany({
				where: {
					uid: uid,
				},
			});

			if (docs == null) {
				return resolve(null);
			}

			return resolve(docs as IMcServer[]);
		});

	public Retreve = (id: string) =>
		new Promise<IMcServer | null>(async (resolve) => {
			const doc = await Controller.prisma.minecraftServer.findUnique({
				where: {
					serverId: id,
				},
			});

			return resolve(doc as IMcServer);
		});

	public AddToQueue = (server: IMcServerReq) =>
		new Promise<IMcServer>(async (resolve) => {
			const doc = await Controller.prisma.serverQueue.create({
				data: {
					waiting: new Date().toISOString(),
					ip: server.ip,
					serverId: v4(),
					uid: server.uid,
					name: server.name,
					world: server.world,
					online: server.online,
					memory: server.memory,
					port: server.port || 0,
					gamemode: server.gamemode,
					maxPlayers: server.maxPlayers,
					rconPort: server.rconPort || 0,
					serverImage: server.serverImage,
				},
			});

			return resolve(doc as IMcServer);
		});

	public Create = (server: IMcServer) =>
		new Promise<IMcServer>(async (resolve) => {
			const doc = await Controller.prisma.minecraftServer.create({
				data: {
					ip: server.ip,
					uid: server.uid,
					name: server.name,
					seed: server.seed,
					world: server.world,
					memory: server.memory,
					online: server.online,
					port: server.port || 0,
					gamemode: server.gamemode,
					serverId: server.serverId,
					maxPlayers: server.maxPlayers,
					rconPort: server.rconPort || 0,
					serverImage: server.serverImage,
				},
			});

			return resolve(doc as IMcServer);
		});

	public Delete = (serverId: string) =>
		new Promise(async (resolve) => {
			const doc = await Controller.prisma.minecraftServer.delete({
				where: {
					serverId: serverId,
				},
			});

			resolve(doc);
		});

	public ChangePending = (serverId: string, pending: boolean) =>
		new Promise(async (resolve) => {
			const doc = await Controller.prisma.minecraftServer.update({
				where: {
					serverId: serverId,
				},
				data: {
					pending: pending,
				},
			});

			resolve(doc);
		});

	public ChangeStatus = (serverId: string, status: boolean) =>
		new Promise(async (resolve) => {
			const doc = await Controller.prisma.minecraftServer.update({
				where: {
					serverId: serverId,
				},

				data: {
					online: status,
				},
			});

			resolve(doc);
		});
}
