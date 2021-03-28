import { Express } from "express";
import { Check } from "./Check";
import { Create } from "./Create";

export class Referal {
  public Check: Check;
  public Create: Create;

  constructor(express: Express) {
    this.Check = new Check(express);
    this.Create = new Create(express);
  }
}
