import mongoose from "mongoose";
import { Schema } from "./Schema";

export class Model {
  static User = mongoose.model("user", Schema.User);
}
