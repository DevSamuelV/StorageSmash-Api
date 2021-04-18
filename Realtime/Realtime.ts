import { WebSockets } from "../websockets/WebSockets";
import { Pending } from "./Status/Pending";

export class Realtime {
	constructor(websockets: WebSockets) {
		new Pending(websockets);
	}
}
