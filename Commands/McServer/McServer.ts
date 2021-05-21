import { Express } from "express";
import { ChangeStatus } from "./ChangeStatus";
import { Create } from "./Create";
import { Get } from "./Get";
import { Shutdown } from "./Shutdown";

export class McServer {
	constructor(_express: Express) {
		new Create(_express);
		new Get(_express);
		new ChangeStatus(_express);
		new Shutdown(_express);
	}
}
