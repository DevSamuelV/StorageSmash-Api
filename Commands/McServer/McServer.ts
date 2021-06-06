import { Express } from "express";
import { ChangeStatus } from "./ChangeStatus";
import { Create } from "./Create";
import { Get } from "./Get";
import { Shutdown } from "./Shutdown";
import { Startup } from "./Startup";

export class McServer {
	constructor(_express: Express) {
		new Create(_express);
		new Get(_express);
		new ChangeStatus(_express);
		new Shutdown(_express);
		new Startup(_express);
	}
}
