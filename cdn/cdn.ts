import { Express } from "express";

import fs from "fs";

export class Cdn {
  constructor(express: Express) {
    const images_dir = fs.readdirSync(this.GetDir("images"));

    for (var i = 0; i != images_dir.length; i++) {
      const f = images_dir[i];
      const f_no_ext = f.split(".")[0];

      const name = `/cdn/images/${f_no_ext}`;
      const dir = this.GetDir(`/images/${f}`);

      express.get(name, (_, res) => {
        if (
          f.includes(".ts") ||
          f.includes(".js") ||
          f.includes(".md") ||
          f.includes(".json") ||
          f.includes(".sh") ||
          f.includes(".exe") ||
          f.includes(".appimage")
        )
          return res.send({
            error: true,
            code: 401,
            message: "Access Denied",
          });

        res.sendFile(dir);
      });
    }
  }

  private GetDir = (dir: string) => {
    return (__dirname + "/" + dir).replace("/build", "");
  };
}
