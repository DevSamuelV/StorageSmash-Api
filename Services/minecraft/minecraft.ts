import {
	IMcServerReq,
	IMcResponse,
	IMcResponseRaw,
} from "../../types/MinecraftServer";
import { RequestorHTTP } from "../../util/requests/Requestor";

export class Minecraft {
	public Create = (server: IMcServerReq, token: string) =>
		new Promise<IMcResponse>(async (resolve) => {
			const result: IMcResponseRaw = await RequestorHTTP.POST({
				url: "http://cloud.storagesmash.com:2335/v1/CreateServer",
				data: { ...server },
				headers: {
					Authorization: token,
				},
			});

			const payload: IMcResponse = {
				data: {
					RconPort: result.data.RconPort,
					ServerId: result.data.ServerPort,
					ServerStatus: result.data.ServerStatus,
					ServerMemory: result.data.ServerMemory,
					ServerName: result.data.ServerName,
					ServerPort: Number(result.data.ServerPort),
				},
			};

			resolve(payload);
		});
	
	public GetLogs = () => {
		
	}

	public Startup = (id: string) =>
		new Promise((resolve) => {
			resolve(null);
		});

	public Shutdown = (id: string) =>
		new Promise((resolve) => {
			// const req = axios.post("/v1/ShutdownServer", { id: id });

			// req.then((res) => console.log(res));
			// req.catch((err) => console.log(err));

			resolve(null);
		});

	public Delete = (id: string) =>
		new Promise((resolve) => {
			// const req = axios.post("/v1/DeleteServer", { id: id });

			// req.then((res) => console.log(res));
			// req.catch((err) => console.log(err));

			resolve(null);
		});
}
