import firebase from "firebase-admin";

import { isFuture } from "date-fns";
import { Env } from "../env/Env";

export class Token {
  private static Auth: firebase.auth.Auth;

  constructor() {
    firebase.initializeApp(Env.Firebase_Key);

    Token.Auth = firebase.auth();
  }

  static Check = (t: string) =>
    new Promise<{ allow: boolean; message: string }>(async (resolve) => {
      const token = await Token.Auth.verifyIdToken(t, true);

      if (token.uid == null)
        return resolve({ allow: true, message: "Your Good to go!" });

      if (!isFuture(token.exp))
        return resolve({ allow: false, message: "Your Token has expired!" });

      return resolve({ allow: false, message: "Unknow Token Error" });
    });
}
