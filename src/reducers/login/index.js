
export const LOGIN_EMAIL = "LOGIN_EMAIL";
export const LOGIN_PASSWORD = "LOGIN_PASSWORD";

let defaultState = {
    email: null,
    password: null
};

export function loginReducer (state = defaultState, action) {
    switch (action.type) {
        case LOGIN_EMAIL:
            return {
                ...state,
                email: action.email
            };
        case LOGIN_PASSWORD:
            return {
                ...state,
                password: action.password
            };
        default:
            return state;
    }
}
