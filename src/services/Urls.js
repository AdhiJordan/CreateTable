
// local urls
export const LOCAL = {
    HOME: "/",
    LOGIN: "/login",
    API_KEYS: "/apikey-settings",
    TRANSACTION_HISTORY: "/transactions",
    GOLD_BALANCE: "/gold-balance",
    GOLD_PRICE: "/gold-price"
};

// remote urls
export const REMOTE = {
    ME: "/partner/auth/me",
    PARTNER_LOGIN: "/partner/auth/login",
    PARTNER_LOGOUT: "/partner/auth/logout",
    API_KEYS: "/partner/:partnerId/apiKeys",
    API_KEYS_BY_ID: "/partner/:partnerId/apiKeys/:id",
    TRANSACTIONS: "/partner/:partnerId/transactionHistory"
};
