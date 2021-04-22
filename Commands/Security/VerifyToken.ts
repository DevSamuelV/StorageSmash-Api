import { Express } from "express";
import { Token } from "../../security/token";

export class VerifyToken {
	constructor(express: Express) {
		express.post("/v1/VerifyToken", async (req, res) => {
			const token = req.body.token;

			const result = await Token.Check(token);

			res.send({
				error: result.allow,
				message: result.message,
				payload: {
					isValid: result.allow,
				},
			});
		});
	}
}
