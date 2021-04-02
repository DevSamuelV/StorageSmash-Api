import { RealtimeServer } from "./Server";

export class McServerLib {
	private serve: RealtimeServer = new RealtimeServer();

	public EmitPendingChange = (pending: boolean) => {
		this.serve.Emit("pendingChange", { isPending: pending });
	};

	public ListenPendingChange = (func: () => void) => {
		this.serve.Listen("pendingChange", func);
	};
}
