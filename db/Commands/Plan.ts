import { MinecraftPlan } from "@prisma/client";
import { Controller } from "../Controller";

export class Plan {
	public Get = () =>
		new Promise(async (resolve) => {
			const _plans = await Controller.prisma.minecraftPlan.findMany();

			resolve(_plans);
		});

	public Create = (_data: MinecraftPlan) =>
		new Promise<MinecraftPlan>(async (resolve) => {
			const _plan = await Controller.prisma.minecraftPlan.create({
				data: _data,
			});

			resolve(_plan);
		});
}
