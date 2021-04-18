import { EventsMap } from "socket.io/dist/typed-events";
import { WebSockets } from "../../websockets/WebSockets";

export class Pending {
	constructor(websockets: WebSockets) {
		websockets.ListenPendingChange(this.Pending);
	}

	private Pending(parms: EventsMap) {
		const isPending: boolean = parms.isPending;
		const isOnline: boolean = parms.isOnline;
		const isOffline: boolean = parms.isOffline;
		const id: string = parms.id;
		const name: string = parms.name;
	}
}
