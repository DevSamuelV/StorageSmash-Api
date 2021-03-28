import { Server } from "socket.io";
import { RealtimeLib } from "./Lib";

export class McServerLib {
  public EmitPendingChange = (pending: boolean) => {
    RealtimeLib.serve.emit("pendingChange", { isPending: pending });
  };
}
