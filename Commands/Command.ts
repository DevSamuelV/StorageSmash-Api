import { Express } from "express";
import { Create } from "./McServer/Create";
import { Get } from "./McServer/Get";
import { Usr_Create } from "./User/Create";
import { Usr_Get } from "./User/Get";

export class Command {
  constructor(express: Express) {
    // User
    new Usr_Create(express);
    new Usr_Get(express);

    // Minecraft Server
    new Get(express);
    new Create(express);
  }
}
