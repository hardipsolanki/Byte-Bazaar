const ROUTES = {
    INDEX: "index",
    auth: {
        SIGNUP: "(auth)/signup",
        LOGIN: "(auth)/login",
    }
}

const ROUTES_PATH = {
    auth: {
        SIGNUP: "/signup",
        LOGIN: "/login",
    }
} as const

export { ROUTES, ROUTES_PATH }