import { Express } from "express";
import { McServer } from "../db/Commands/McServer";
import { Referal } from "./Referal/Referal";
import { User } from "./User/User";

export class Command {
  constructor(express: Express) {
    // User
    new User(express);

    // Minecraft Server
    new McServer();

    // Referal
    new Referal(express);
  }
}
