import { SupabaseClient } from "@supabase/supabase-js";

export class Token {
	private static supabase: SupabaseClient;

	constructor(_supabase: SupabaseClient) {
		Token.supabase = _supabase;
	}

	static Check = (
		t: string
	): Promise<{ allow: boolean; message: string; uid?: string }> =>
		Token.supabase.auth.api
			.getUser(t)
			.then(({ user }) => {
				if (user == null)
					return Promise.resolve({
						allow: false,
						message: "Your Token is not verifyed",
					});

				if (user?.id != null) {
					return Promise.resolve({
						allow: true,
						message: "Your Token is ok",
						uid: user.id,
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
