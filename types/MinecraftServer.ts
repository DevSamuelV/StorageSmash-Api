export type IMcServer = {
  serverId: string;
  serverImage: string;
  name: string;
  port: number;
  ip: string;
  memory: number;
  uid: string;
  gamemode: string;
  maxPlayers: number;
  world: string;
  seed: string;
  online: boolean;
};

export type IMcServerReq = {
  serverImage: string;
  name: string;
  port: number;
  ip: string;
  memory: number;
  uid: string;
  gamemode: string;
  maxPlayers: number;
  world: string;
  seed: string;
  online: boolean;
};
