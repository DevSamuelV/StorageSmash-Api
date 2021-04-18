import { Express } from "express";
import { Usr_Create } from "./Create";
import { Usr_Get } from "./Get";
import { Usr_Username } from "./Username";

export class User {
	constructor(express: Express) {
		new Usr_Get(express);
		new Usr_Create(express);
		new Usr_Username(express);
	}
}
