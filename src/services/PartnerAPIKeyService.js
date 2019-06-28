
'use strict';

import { makeRequest } from "./APIService";
import * as URLS from "./Urls";

let PartnerAPIKeyService = {};

PartnerAPIKeyService.generateApiKey = function (partnerId) {
    return new Promise((resolve, reject) => {
        makeRequest({
            method: "post",
            url: URLS.REMOTE.API_KEYS.replace(":partnerId", partnerId)
        }).then(result => {
            resolve({ apiKey: result.data.data });
        }).catch(error => {
            reject(error);
        });
    });
};

PartnerAPIKeyService.deleteApiKey = function (partnerId, apiKeyId) {
    return new Promise((resolve, reject) => {
        makeRequest({
            method: "delete",
            url: URLS.REMOTE.API_KEYS_BY_ID.replace(":partnerId", partnerId).replace(":id", apiKeyId)
        }).then(result => {
            if (result.data.success) {
                resolve();
            } else {
                reject(new Error("Ops! Something went wrong"));
            }
        }).catch(error => {
            reject(error);
        });
    });
};

PartnerAPIKeyService.getApiKeys = function (partnerId) {
    return new Promise((resolve, reject) => {
        makeRequest({
            url: URLS.REMOTE.API_KEYS.replace(":partnerId", partnerId)
        }).then(result => {
            resolve({ apiKeys: result.data.data });
        }).catch(error => {
            // reject(error);
            resolve({ apiKeys: [
                { partner: null, partnerId: 1000000,
                    apiKey: "ABDXAAFDAFFASFASFN6",
                    deletedAt: null, createdAt: "2019-06-08T06:08:04.714+0000",
                    updatedAt: "2019-06-08T06:08:04.714+0000",
                    id: 7 }] });
        });
    });
};

export default PartnerAPIKeyService;
