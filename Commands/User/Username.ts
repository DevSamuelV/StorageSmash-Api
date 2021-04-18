import { Express } from "express";
import { db } from "../../db/db";

export class Usr_Username {
	constructor(express: Express) {
		express.post("/v1/UpdateUsername", async (req, res) => {
			const uid = req.body.uid;
			const username = req.body.username;

			const updatedUser = await db.user.UpdateUsername(uid, username);

			return res.send({
				error: false,
				message: "Username Updated",
				code: 200,
				payload: {
					user: updatedUser,
				},
			});
		});
	}
}
