import { Express } from "express";
import { Create } from "../McServer/Create";
import { Get } from "../McServer/Get";

export class User {
  constructor(express: Express) {
    new Get(express);
    new Create(express);
  }
}
