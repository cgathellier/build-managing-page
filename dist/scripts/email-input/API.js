export default class API {
    static post(endpoint, data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ status: '201', data });
            }, 300);
        });
    }
}
