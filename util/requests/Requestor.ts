import axios from "axios";
import http from "http";

type Payload = {
	data: {};
	headers: {};
	url: string;
};

type Err = {
	message: string;
};

type Result = {
	data: {};
};

export class RequestorHTTP {
	public static POST = (props: Payload) =>
		new Promise<any>(async (resolve) => {
			const request = await axios({
				method: "POST",
				...props,
			});

			resolve(request.data);
		});

	// public static POST = (options: http.RequestOptions | URL, payload: Object) =>
	// 	new Promise<Result | Err>(async (resolve) => {
	// 		const data = await RequestorHTTP.Request(
	// 			{ ...options, method: "post" },
	// 			payload
	// 		);

	// 		return resolve(data);
	// 	});

	private static Request = (
		options: string | http.RequestOptions | URL,
		data: Object
	) =>
		new Promise<Result | Err>((resolve) => {
			const request = http.request(options);
			request.end();

			request.on("connect", (res, socket) => {
				res.setEncoding("utf8");
				res.setTimeout(10000);

				console.log(res);

				socket.write(JSON.stringify(data));

				res.on("error", (err) => {
					console.log(err);

					return resolve({ ...err });
				});

				res.on("data", (ch) => {
					console.log(ch);

					resolve(JSON.parse(ch));
				});
			});
		});
}
