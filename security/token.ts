import firebase from "firebase-admin";

import { Env } from "../env/Env";

export class Token {
  private static Auth: firebase.auth.Auth;

  constructor() {
    firebase.initializeApp(Env.Firebase_Key);

    Token.Auth = firebase.auth();
  }

  static Check = (t: string) =>
    new Promise(async (resolve) => {
      const token = await Token.Auth.verifyIdToken(t);
    });
}
