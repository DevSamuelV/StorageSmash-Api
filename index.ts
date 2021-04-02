import Express from "express";
import helmet from "helmet";

import { json } from "body-parser";
import { Server } from "socket.io";
import { Command } from "./Commands/Command";
import { Controller } from "./db/Controller";
import { Cdn } from "./cdn/cdn";
import { Cors } from "./Middleware/Cors";
import { RealtimeLib } from "./realtime/Lib";

require("dotenv").config();

/* -------------------------------------------------------------------------- */
/*                                 API SERVER                                 */
/* -------------------------------------------------------------------------- */

const PORT = process.env.SS_PORT!;
const REALTIME_PORT = Number(process.env.SS_REALTIME_PORT)!;

const app = Express();

app.use(json());
app.use(helmet());
app.use(Cors);

app.listen(PORT, () => {
  console.log(`server is running on port ==> ${PORT}`);
});

new Controller();
new Command(app);
new Cdn(app);

/* -------------------------------------------------------------------------- */
/*                               REALTIME SERVER                              */
/* -------------------------------------------------------------------------- */

const server = new Server();

server.listen(REALTIME_PORT, {
  cors: {
    origin: "*",
    allowedHeaders: "Content-Type,content-type,Authorization,dev",
    methods: "POST, GET",
  },
});

new RealtimeLib(server);
