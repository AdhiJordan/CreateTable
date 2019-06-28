

export const API_KEYS_LOADING = "API_KEYS_LOADING";
export const API_KEYS_ERROR = "API_KEYS_ERROR";
export const API_KEYS_DATA = "API_KEYS_DATA";
export const API_KEYS_GENERATING = "API_KEYS_GENERATING";
export const API_KEYS_ADD = "API_KEYS_ADD";
export const API_KEYS_DELETE = "API_KEYS_DELETE";

let defaultState = {
    isLoading: true,
    isGenerating: false,
    error: null,
    data: []
};

export function apiKeysReducer (state = defaultState, action) {
    switch (action.type) {
        case API_KEYS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case API_KEYS_DATA:
            return {
                ...state,
                data: action.data
            };
        case API_KEYS_ERROR:
            return {
                ...state,
                error: action.error
            };
        case API_KEYS_GENERATING:
            return {
                ...state,
                isGenerating: action.isGenerating
            };
        case API_KEYS_ADD:
            state.data.push(action.newKey);
            return {
                ...state
            };
        case API_KEYS_DELETE:
            state.data = state.data.filter(d => d.id !== action.deletedKey.id);
            return {
                ...state
            };
        default:
            return state;
    }
}
