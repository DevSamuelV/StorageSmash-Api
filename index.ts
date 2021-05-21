import Express from "express";
import helmet from "helmet";
import Cors from "cors";

import { Cdn } from "./cdn/cdn";
import { json } from "body-parser";
import { Command } from "./Commands/Command";
import { Realtime } from "./Realtime/Realtime";
import { Controller } from "./db/Controller";
import { WebSockets } from "./websockets/WebSockets";
import { Security } from "./security/Security";
import { ws } from "./ws/ws";

require("dotenv").config();

/* -------------------------------------------------------------------------- */
/*                                 API SERVER                                 */
/* -------------------------------------------------------------------------- */

const PORT = process.env.SS_PORT!;

const app = Express();

app.use(json());
app.use(helmet());
app.use(Cors({ origin: "*" }));

app.listen(PORT, () => {
	console.log(`server is running on port ==> ${PORT}`);
});

new Controller();
new Security();
new Command(app);
new Cdn(app);

/* -------------------------------------------------------------------------- */
/*                               REALTIME SERVER                              */
/* -------------------------------------------------------------------------- */

// this will initlize the server
new ws();

// const websockets = new WebSockets();

// new Realtime(websockets);
