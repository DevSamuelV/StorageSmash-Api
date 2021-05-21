import { Express } from "express";
import { db } from "../../db/db";
import { User } from "../../security/FirebaseUser";
import { IUser } from "../../types/User";

export class Usr_Get {
	constructor(express: Express) {
		express.post("/v1/GetUser", async (req, res) => {
			if (req.body.uid == null)
				return res.send({
					error: true,
					code: 500,
					message: "Please Define Uid",
				});

			const uid = req.body.uid;
			const user = await db.user.Get(uid);
			const userExists = await User.Exists(uid);

			if (userExists.uid != null && user == null) {
				const data: IUser = {
					email: userExists.email || "Email-None",
					photoURL:
						userExists.photoURL ||
						"https://www.flaticon.com/svg/static/icons/svg/1880/1880990.svg",
					uid: userExists.uid,
					username: userExists.username || "no-name",
				};

				const newUsr = await this.CreateNewUser(data);

				return res.send({
					error: false,
					code: 201,
					message: "User Existing User Recreated",
					payload: {
						user: { ...newUsr },
					},
				});
			}

			if (user == null) {
				return res.send({
					error: true,
					code: 500,
					message: "User Not Found",
				});
			}

			return res.send({
				error: false,
				code: 500,
				message: "User retreved",
				payload: {
					user: { ...user },
				},
			});
		});
	}

	private CreateNewUser(usr: IUser): Promise<IUser> {
		return db.user.Create(usr);
	}
}
