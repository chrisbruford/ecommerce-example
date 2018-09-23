export class Http {
    static get(url) {

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.send();

            xhr.onload = () => {
                if (xhr.status === 200) {
                    try {
                        let data = JSON.parse(xhr.responseText);
                        resolve(data);
                    }
                    catch (e) {
                        reject(Object.assign(new Error('Failed to parse JSON'), { innerError: e }));
                    }
                    resolve(xhr.responseText);
                }
                else if (xhr.status === 404) {
                    reject(Object.assign(new Error(`404 Returned from ${url}`), { status: xhr.status, statusText: xhr.statusText }));
                }
                else {
                    reject(Object.assign(new Error(`Request to ${url} failed: status: ${xhr.status}, statusText: ${xhr.statusText}`), { status: xhr.status, statusText: xhr.statusText }));
                }
            }
        });
    }
}