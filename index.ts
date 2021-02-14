import Express from "express";
import parser from "body-parser";
import helmet from "helmet";

import { Command } from "./Commands/Command";
import { Controller } from "./db/Controller";
import { Cdn } from "./cdn/cdn";
import { Cors } from "./Middleware/Cors";

require("dotenv").config();

const PORT = process.env.SS_PORT!;

const app = Express();

app.use(parser.json());
app.use(helmet());
app.use(Cors);

app.listen(PORT, () => {
  console.log(`server is running on port ==> ${PORT}`);
});

new Controller();
new Command(app);
new Cdn(app);
