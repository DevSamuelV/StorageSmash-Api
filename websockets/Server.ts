import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export class RealtimeServer {
	private serve: Server = new Server({ cors: { origin: "*" } });

	constructor() {
		this.serve.listen(32542);
	}

	public Listen(
		event: string,
		func: (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => void
	) {
		this.serve.on("connection", (socket) => socket.on(event, func));
	}

	public Emit(event: string, parms: any) {
		this.serve.emit(event, parms);
	}
}
