const ROUTES = {
    INDEX: "index",
    auth: {
        SIGNUP: "(auth)/signup",
        LOGIN: "(auth)/login",
    },
    tabs: "(tabs)",
    home: "home",
    profile: "profile",
    order: "order",
    about: "about",
    productDetails: "products/[slug]",
    cart: "cart",
    addressCheckout: "checkout/address-checkout",
    paymentCheckout: "checkout/payment-checkout",

}

const ROUTES_PATH = {
    auth: {
        SIGNUP: "/signup",
        LOGIN: "/login",
    },
    home: "/home",
    profile: "/profile",
    order: "/order",
    about: "/about",
    productDetails: "/products/[slug]",
    cart: "/cart",
    addressCheckout: "/checkout/address-checkout",
    paymentCheckout: "/checkout/payment-checkout",
} as const

export { ROUTES, ROUTES_PATH }