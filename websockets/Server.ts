import { Server, Socket } from "socket.io";
import { Express } from "express";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

import { createServer } from "http";

export class RealtimeServer {
	constructor(app: Express) {}

	// public Join(id: string, socket: Socket<DefaultEventsMap, DefaultEventsMap>) {
	// 	socket.join(id);
	// }

	// public Listen(
	// 	event: string,
	// 	func: (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => void
	// ) {
	// 	this.serve.on("connection", (socket) => {
	// 		socket.on(event, func);
	// 	});
	// }

	// public Emit(event: string, parms: any) {
	// 	this.serve.emit(event, parms);
	// }

	// public EmitTo(id: string, event: string, parms: any) {
	// 	this.serve.to(id).emit(event, parms);
	// }
}
