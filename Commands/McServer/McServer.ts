import { Express } from "express";
import { ChangeStatus } from "./ChangeStatus";
import { Create } from "./Create";
import { Get } from "./Get";

export class McServer {
	constructor(express: Express) {
		new Create(express);
		new Get(express);
		new ChangeStatus(express);
	}
}
