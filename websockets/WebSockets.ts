import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { ServerPendingChange } from "../types/MinecraftServer";
import { RealtimeServer } from "./Server";

export class WebSockets {
	// private serve: RealtimeServer = new RealtimeServer();

	public EmitPendingChange = (data: ServerPendingChange) => {
		// this.serve.Emit("pendingChange", { ...data });
	};

	public ListenPendingChange = (
		func: (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => void
	) => {
		// this.serve.Listen("pendingChange", func);
	};
}
