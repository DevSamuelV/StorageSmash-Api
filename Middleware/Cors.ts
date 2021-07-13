import { Request, Response } from "../types/Request";

export async function Cors(req: Request, res: Response, next: () => void) {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, authorization"
	);

	next();
}
