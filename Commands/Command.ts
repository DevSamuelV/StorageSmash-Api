import { Express } from "express";
import { cmd_user_create } from "./User/Create";
import { cmd_user_get } from "./User/Get";

export class Command {
  constructor(express: Express) {
    // User
    new cmd_user_create(express);
    new cmd_user_get(express);

    // Minecraft Server
  }
}
