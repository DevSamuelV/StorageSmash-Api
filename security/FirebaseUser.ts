import { SupabaseAuthClient } from "@supabase/supabase-js/dist/main/lib/SupabaseAuthClient";
import { db } from "../db/db";

type Metadata = {
	[key: string]: any;
};

type Exists = {
	disabled: boolean | undefined;
	uid: string | undefined;
	email: string | undefined;
	photoURL: string | undefined;
	username: string | undefined;
};

export class User {
	private static Auth: SupabaseAuthClient;

	constructor(Auth: SupabaseAuthClient) {
		User.Auth = Auth;
	}

	static Exists = (uid: string) =>
		new Promise<Exists | null>(async (resolve, reject) => {
			const _user = await db.user.Get(uid);

			if (_user == null) return resolve(null);


			const data: Exists = {
				disabled: false,
				email: _user.email,
				photoURL: "",
				uid: _user.uid,
				username: _user.username,
			};

			if (_user.uid != null) return resolve({ ...data });

			return resolve({
				uid: undefined,
				disabled: false,
				email: undefined,
				photoURL: undefined,
				username: undefined,
			});
		});
}
