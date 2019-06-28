

import { combineReducers } from "redux";
import {
    appStateReducer
} from "./appState/index";
import {
    loginReducer
} from "./login";
import {
    apiKeysReducer
} from "./apiKeys";
import { loadingBarReducer } from 'react-redux-loading-bar';


export default combineReducers({
    appState: appStateReducer,
    login: loginReducer,
    apiKeys: apiKeysReducer,
    loadingBar: loadingBarReducer
});
