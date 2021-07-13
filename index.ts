import Express from "express";
import helmet from "helmet";
// import Cors from "cors";

import { Cors } from "./Middleware/Cors";
import { ws } from "./ws/ws";
import { Cdn } from "./cdn/cdn";
import { json } from "body-parser";
import { Command } from "./Commands/Command";
import { Controller } from "./db/Controller";
import { Security } from "./security/Security";
import { collectDefaultMetrics, register } from "prom-client";

import { init, Handlers } from "@sentry/node";
import { TokenMiddleWare } from "./Middleware/Token";

require("dotenv").config();

/* -------------------------------------------------------------------------- */
/*                        Enable Sentry Error Reporting                       */
/* -------------------------------------------------------------------------- */

init({
	dsn: "https://df28ffc0fb604b59a3ca5bf716270e21@o759013.ingest.sentry.io/5792457",
});

/* -------------------------------------------------------------------------- */
/*                                 API SERVER                                 */
/* -------------------------------------------------------------------------- */

const PORT = process.env.PORT!;
const app = Express();

app.use(json());
app.use(helmet());
app.use(Cors);
app.use(TokenMiddleWare);
app.use(Handlers.errorHandler());
app.use(Handlers.requestHandler());

// Add grafana monitoring
// app.get("/metrics", async (_req, res) => {
// 	try {
// 		res.set("Content-Type", register.contentType);
// 		res.end(await register.metrics());
// 	} catch (err) {
// 		res.status(500).end(err);
// 	}
// });

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
