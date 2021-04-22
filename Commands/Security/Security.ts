import { Express } from "express";
import { VerifyToken } from "./VerifyToken";

export class Security {
	constructor(express: Express) {
		new VerifyToken(express);
	}
}
