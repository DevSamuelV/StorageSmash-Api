import firebase from "firebase-admin";

import { db } from "../db/db";
import { Env } from "../env/Env";
import { User } from "./FirebaseUser";
import { Token } from "./token";
import { EncryptJWT } from "jose/jwt/encrypt";
import { generateKeyPairSync } from "crypto";
import { createClient } from "@supabase/supabase-js";

export class Security {
	private static keyPair = generateKeyPairSync("rsa", { modulusLength: 2048 });
	public static supabase = createClient(
		process.env.SUPABASE_URL!,
		process.env.SERVICE_KEY!
	);

	constructor() {
		const fbAuth = firebase
			.initializeApp({
				credential: firebase.credential.cert(Env.Firebase_Key),
				databaseURL: "https://officialstoragesmash.firebaseio.com",
			})
			.auth();

		new Token(Security.supabase);
		new User(Security.supabase.auth);
	}

	static jwt = class {
		public static Generate = async (data: any) =>
			await new EncryptJWT(data)
				.setProtectedHeader({ alg: "dir", enc: "A256GCM" })
				.setIssuedAt()
				.setIssuer("urn:ss:server")
				.setExpirationTime("1min")

				// needs secret key
				.encrypt(Security.keyPair.privateKey);
	};

	static User = class {
		static DoesOwn = class {
			static Server = (id: string, uid: string) =>
				new Promise<boolean>(async (resolve) => {
					const result = await db.mc.Retreve(id);

					if (result == null) {
						return resolve(false);
					}

					if (result.uid == uid) {
						return resolve(true);
					}

					return resolve(false);
				});
		};
	};
}
