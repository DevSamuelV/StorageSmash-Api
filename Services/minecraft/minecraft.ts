import {
	IMcServerReq,
	IMcResponse,
	IMcResponseRaw,
} from "../../types/MinecraftServer";
import { RequestorHTTP } from "../../util/requests/Requestor";

type ServerResponse = {
	message: string;
	payload: any;
	error: boolean;
};

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

	public GetLogs = (id: string, token: string) =>
		new Promise<ServerResponse>(async (resolve) => {
			const result = await RequestorHTTP.POST({
				url: "http://cloud.storagesmash.com:2335/v1/GetLogs",
				data: { id: id },
				headers: {
					Authorization: token,
				},
			});
			const _data = result.data;

			if (_data.error == true) {
				return resolve({ message: _data.message, error: true, payload: null });
			}

			resolve({ message: _data.message, error: _data.error, payload: _data });
		});

	public Startup = (id: string, token: string) =>
		new Promise<ServerResponse>(async (resolve) => {
			const result = await RequestorHTTP.POST({
				url: "http://cloud.storagesmash.com:2335/v1/StartServer",
				data: { id: id },
				headers: {
					Authorization: token,
				},
			});
			const _data = result.data;

			if (_data.error == true) {
				return resolve({ message: _data.message, error: true, payload: null });
			}

			resolve({ message: _data.message, error: _data.error, payload: _data });
		});

	public Shutdown = (id: string, token: string) =>
		new Promise<ServerResponse>(async (resolve) => {
			const result = await RequestorHTTP.POST({
				url: "http://cloud.storagesmash.com:2335/v1/ShutdownServer",
				data: { id: id },
				headers: {
					Authorization: token,
				},
			});
			const _data = result.data;

			if (_data.error == true) {
				return resolve({ message: _data.message, error: true, payload: null });
			}

			resolve({ message: _data.message, error: _data.error, payload: _data });
		});

	public Delete = (id: string) =>
		new Promise((resolve) => {
			// const req = axios.post("/v1/DeleteServer", { id: id });

			// req.then((res) => console.log(res));
			// req.catch((err) => console.log(err));

			resolve(null);
		});
}
