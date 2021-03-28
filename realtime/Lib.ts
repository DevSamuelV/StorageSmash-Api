import { Server } from "socket.io";
import { McServerLib } from "./McServer";

export class RealtimeLib {
  public static serve: Server;

  public McServer = new McServerLib();

  constructor(serve: Server) {
    RealtimeLib.serve = serve;
  }
}
