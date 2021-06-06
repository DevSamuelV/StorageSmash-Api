import { Express } from "express";

import fs from "fs";

export class Cdn {
	constructor(express: Express) {
		const _dir = fs.readdirSync(this.GetDir("data"));

		for (var i = 0; i != _dir.length; i++) {
			const f = _dir[i];
			const f_no_ext = f.split(".")[0];

			const name = `/cdn/data/${f_no_ext}`;
			const dir = this.GetDir(`/data/${f}`);

			express.get(name, (_, res) => {
				if (
					f.includes(".json") ||
					f.includes(".gif") ||
					f.includes(".jpg") ||
					f.includes(".jpeg") ||
					f.includes(".png")
				)
					return res.sendFile(dir);

				res.send({
					error: true,
					code: 401,
					message: "Access Denied",
				});
			});
		}
	}

	private GetDir = (dir: string) => {
		return (__dirname + "/" + dir).replace("/build", "");
	};
}
