export type IMcServer = {
	serverId: string;
	serverImage: string;
	name: string;
	ip: string;
	memory: number;
	uid: string;
	gamemode: string;
	maxPlayers: number;
	online: boolean;
	port?: number;
	world?: string;
	seed: string;
	rconPort?: number;
};

export type ServerPendingChange = {
	name: string;
	id: string;
	isPending: boolean;
	isOnline: boolean;
	isOffline: boolean;
};

export type IMcServerReq = {
	serverImage: string;
	name: string;
	ip: string;
	memory: number;
	uid: string;
	gamemode: string;
	maxPlayers: number;
	online: boolean;
	port?: number;
	rconPort?: number;
	world: string;
	seed: string;
};

export enum ServerProperties {
	NO_SEED = "NO-SEED",
	NO_WORLD = "NO-WORLD",
}
