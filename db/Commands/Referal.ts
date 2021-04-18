import {} from "date-fns";
import { Controller } from "../Controller";

export class Referal {
	public Create = (code: string, exp: string, perc: number) =>
		new Promise(async (resolve) => {
			console.log(exp, code, perc);

			const result = await Controller.prisma.referal.create({
				data: {
					expires: exp,
					code: code,
					percent: perc,
				},
			});

			resolve(result);
		});

	public Get = (code: string) =>
		new Promise(async (resolve) => {
			const count = await Controller.prisma.referal.count();

			if (count == null || count == 0) return null;

			const result = await Controller.prisma.referal.findUnique({
				where: {
					code: code,
				},
			});

			resolve(result);
		});
}
