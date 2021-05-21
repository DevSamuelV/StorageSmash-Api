import firebase from "firebase-admin";

import { isFuture } from "date-fns";

export class Token {
	private static Auth: firebase.auth.Auth;

	constructor(Auth: firebase.auth.Auth) {
		Token.Auth = Auth;
	}

	static Check = (
		t: string
	): Promise<{ allow: boolean; message: string; uid?: string }> =>
		Token.Auth.verifyIdToken(t, true)
			.then((tk) => {
				if (tk.uid != null) {
					return Promise.resolve({
						allow: true,
						message: "Your Token is ok",
						uid: tk.uid,
					});
				}

				return Promise.resolve({
					allow: false,
					message: "Your Token is not verifyed",
				});
			})
			.catch((err) => {
				return Promise.resolve({
					allow: false,
					message: err.message,
				});
			});
}
