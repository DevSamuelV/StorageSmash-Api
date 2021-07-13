import { Express } from "express";
import { Create } from "./Create";
import { Get } from "./Get";

export class Plan {
	constructor(express: Express) {
		new Get(express);
		new Create(express);
	}
}
