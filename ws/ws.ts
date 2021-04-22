import { RealtimeServer } from "../websockets/Server";

export class ws {
  private server: RealtimeServer = new RealtimeServer();

  constructor() {
    this.server.Listen("RCON-GET-LOGS", (res) => {
      const serverId = res.data.serverId;

      
    })
  }
}