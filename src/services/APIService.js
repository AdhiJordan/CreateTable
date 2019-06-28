
import axios from "axios";
import AuthService from "./AuthService";

axios.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${AuthService.getAccessToken()}`;

    if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
    }
    return config;
});

axios.interceptors.response.use((response) => {
    return response;
}, error => {
    if (error && error.response && error.response.status === 401 || error.response.status === 403) {
        AuthService.logout();
        window.location.reload();
    }
});

export function makeRequest (config) {
    return new Promise((resolve, reject) => {
        try {
            axios({
                method: config.method || "get",
                baseURL: config.baseURL ? config.baseUrl : window.Environment.API_BASE,
                url: config.url,
                data: config.data,
                headers: config.headers ? config.headers : {},
                params: config.params,
                timeout: config.timeout ? config.timeout : 100000,
                cancelToken: config.cancelToken,
                validateStatus: false
            }).then((result) => {
                if (result.status >= 200 && result.status < 300) {
                    resolve(result);
                } else {
                    errorHandler(reject, result);
                }
            }).catch(error => {
                errorHandler(reject, error);
            });
        } catch (err) {
            reject(err);
        }
    });
}

export function errorHandler (reject, err) {
    if (err.code === "ECONNABORTED") {
        return reject(err);
    }

    switch (err.status) {
        case 401:
        case 503:
            AuthService.logout();
            window.location.href = "/";
            break;
        default:
            return reject(err.data);
    }
    return reject(err.message);
}

