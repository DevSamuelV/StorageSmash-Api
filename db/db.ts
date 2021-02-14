import { McServer } from "./Commands/McServer";
import { User } from "./Commands/User";

export class db {
  static mc = new McServer();
  static user = new User();
}
