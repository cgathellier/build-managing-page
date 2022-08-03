export interface ResponseObj {
	status: string;
	data: string;
}

export default class API {
	static post(endpoint: string, data: string) {
		return new Promise<ResponseObj>((resolve, reject) => {
			setTimeout(() => {
				resolve({ status: '201', data });
			}, 300);
		});
	}
}
