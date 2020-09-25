import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

class ServerCalls {
    axiosFetch(options) {
        const { url, method, payload } = options;
        if (options.method === 'GET') return axios(`${API_BASE_URL}${url}`);
        return axios({
            url: `${API_BASE_URL}${url}`,
            method,
            data: payload
        })

    }

    getDetailsFromServer(url) {
        this.axiosFetch({ url, method: 'GET' })
            .then(response => {
                if (response.status == 200) return response.data;
                return 'bad Request';
            })
            .catch(error => { console.log(error) });
    }

    sendDetailsToServer(options, resp, reject) {
        this.axiosFetch(options)
            .then(response => {
                if (response.status === 200) {
                    return setTimeout(resp(response.data), 1000);
                }
                console.log(response);
                return setTimeout(reject(response.data), 1000);
            })
            .catch(error => { 
                console.log(error)
                return setTimeout(reject({message: 'Poor Network Signal...'}), 1000);
            })
    }

}

export default new ServerCalls;