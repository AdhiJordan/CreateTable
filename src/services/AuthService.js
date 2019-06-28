
let AuthService = {};
export default AuthService;

import {
    makeRequest
} from "./APIService";
import * as URLS from "./Urls";

AuthService.ACCESS_TOKEN_KEY = "com.token";

AuthService.ACCESS_TOKEN = window.localStorage.getItem(AuthService.ACCESS_TOKEN_KEY);

AuthService.getAccessToken = () => {
    if (!AuthService.ACCESS_TOKEN) {
        AuthService.ACCESS_TOKEN = window.localStorage.getItem(AuthService.ACCESS_TOKEN_KEY);
    }
    return AuthService.ACCESS_TOKEN;
};

AuthService.checkIfLoggedIn = () => {
    AuthService.getAccessToken();
    return !!AuthService.ACCESS_TOKEN;
};

AuthService.login = (email, password) => {
    return new Promise((resolve, reject) => {
        AuthService.logout()
            .then(() => {
                return makeRequest({
                    method: "POST",
                    url: URLS.REMOTE.PARTNER_LOGIN,
                    data: { email, password }
                });
            }).then(result => {
                window.localStorage.setItem(AuthService.ACCESS_TOKEN_KEY, result.data.data.token);
                resolve(result.data.data);
            }).catch(error => {
                // reject(error.data);
                console.log("Failing...", error, reject);
                resolve({ token: "abcdefgh",
                    user: { companyName: "xyzInc", companyDomain: "www.example.com",
                        contractUrl: "https://www.google.com", email: "john@gmail.com",
                        contactPerson: "john doe", phone: "08888888888", active: true,
                        kycType: "MANUAL", deletedAt: null, createdAt: "2019-05-08T11:41:52.376+0000",
                        updatedAt: "2019-05-08T11:41:52.376+0000", id: 1000000 } });
            });
    });
};

AuthService.logout = () => {
    return new Promise((resolve, reject) => {
        const token = AuthService.getAccessToken();
        if (token) {
            window.localStorage.removeItem(AuthService.ACCESS_TOKEN_KEY);
            AuthService.ACCESS_TOKEN = null;
            makeRequest({
                method: "post",
                url: URLS.REMOTE.PARTNER_LOGOUT
            }).then(resolve)
                .catch(resolve);
            // .catch(reject);
        } else {
            resolve();
        }
    });
};

AuthService.me = () => {
    return new Promise((resolve, reject) => {
        makeRequest({
            url: URLS.REMOTE.ME
        }).then(result => {
            if (!result.data.success || !result.data.data) {
                AuthService.logout();
                reject();
            } else {
                resolve(result.data.data);
            }
        }).catch(error => {
            AuthService.logout();
            reject(error);
        });
    });
};

