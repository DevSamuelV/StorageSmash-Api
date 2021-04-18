import firebase from "firebase-admin";
import { Env } from "../env/Env";
import { FirebaseUser } from "./FirebaseUser";

import { Token } from "./token";

export class Security {
	constructor() {
		const fbAuth = firebase
			.initializeApp({
				credential: firebase.credential.cert(Env.Firebase_Key),
				databaseURL: "https://officialstoragesmash.firebaseio.com",
			})
			.auth();

		new Token(fbAuth);
		new FirebaseUser(fbAuth);
	}
}
