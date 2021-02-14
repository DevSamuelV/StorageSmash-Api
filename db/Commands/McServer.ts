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

      return resolve(docs);
    });

  public Create = (server: IMcServerReq) =>
    new Promise<IMcServer>(async (resolve) => {
      const doc = await Controller.prisma.minecraftServer.create({
        data: {
          serverId: v4(),
          seed: server.seed,
          ip: server.ip,
          maxPlayers: server.maxPlayers,
          memory: server.memory,
          name: server.name,
          online: server.online,
          port: server.port,
          serverImage: server.serverImage,
          uid: server.uid,
          gamemode: server.gamemode,
          world: server.world,
        },
      });

      return resolve(doc);
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

  static ChangeStatus = (serverId: string, status: boolean) =>
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
