import { Express } from "express";
import { ChangeStatus } from "./ChangeStatus";
import { Create } from "./Create";
import { Get } from "./Get";

export class McServer {
  public Create: Create;
  public Get: Get;
  public ChangeStatus: ChangeStatus;

  constructor(express: Express) {
    this.Create = new Create(express);
    this.Get = new Get(express);
    this.ChangeStatus = new ChangeStatus(express);
  }
}
