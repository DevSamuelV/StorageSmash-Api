import mongoose from "mongoose";
import { Env } from "../env/Env";

export class Controller {
  static Init() {
    mongoose.connect(Env.DB_URL, {
      user: "API",
      pass: Env.DB_PASSWORD,
    });
  }
}
