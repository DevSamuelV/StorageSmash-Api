import { McServer } from "./Commands/McServer";
import { Plan } from "./Commands/Plan";
import { Referal } from "./Commands/Referal";
import { User } from "./Commands/User";

export class db {
	static mc = new McServer();
	static user = new User();
	static Referal = new Referal();
	static Plans = new Plan();
}
