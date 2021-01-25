import mongoose from "mongoose";

export class Schema {
  static User = new mongoose.Schema({
    username: String,
    uid: String,
    email: String,
    photoURL: String,
  });

  static McServer = new mongoose.Schema({
    name: String,
    icon: String,
  });
}
