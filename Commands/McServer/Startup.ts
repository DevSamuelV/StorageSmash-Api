import { Express } from "express";
import { Response } from "../../types/Request";

export class Startup {
	constructor(express: Express) {
		express.post("/v1/ServerStartup", (req, res: Response) => {
			// if ()
		});
	}
}
