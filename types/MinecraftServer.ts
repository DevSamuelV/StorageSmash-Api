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

export type IMcResponse = {
	data: {
		ServerName: string;
		ServerPort: number;
		ServerId: string;
		RconPort: number;
		ServerMemory: number;
		ServerStatus: boolean;
	};
};

export type IMcResponseRaw = {
	data: {
		ServerName: string;
		ServerPort: string;
		ServerId: string;
		RconPort: number;
		ServerMemory: number;
		ServerStatus: boolean;
	};
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
