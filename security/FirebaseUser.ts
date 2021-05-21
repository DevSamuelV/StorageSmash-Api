import firebase from "firebase-admin";
import { db } from "../db/db";

type Exists = {
	disabled: boolean | undefined;
	uid: string | undefined;
	metadata: firebase.auth.UserMetadata | undefined;
	email: string | undefined;
	photoURL: string | undefined;
	username: string | undefined;
};

export class User {
	private static Auth: firebase.auth.Auth;

	constructor(Auth: firebase.auth.Auth) {
		User.Auth = Auth;
	}

	static Exists = (uid: string) =>
		new Promise<Exists>(async (resolve, reject) => {
			const user = await User.Auth.getUser(uid);

			const data: Exists = {
				disabled: user.disabled,
				email: user.email,
				metadata: user.metadata,
				photoURL: user.photoURL,
				uid: user.uid,
				username: user.displayName,
			};

			if (user.uid != null) return resolve({ ...data });

			return resolve({
				uid: undefined,
				disabled: false,
				email: undefined,
				metadata: undefined,
				photoURL: undefined,
				username: undefined,
			});
		});
}
