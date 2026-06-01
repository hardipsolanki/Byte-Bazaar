const ROUTES = {
    INDEX: "index",
    auth: {
        SIGNUP: "(auth)/signup",
        LOGIN: "(auth)/login",
    },
    tabs: "(tabs)",
    home: "home",
    profile: "profile",
    order: "orders",
    about: "about",
    productDetails: "products/[slug]",
    cart: "cart",
    addressCheckout: "checkout/address-checkout",
    paymentCheckout: "checkout/payment-checkout",
    paymentSucess: "checkout/success",
    singleOrder: "orders/[orderId]",

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
    paymentSucess: "/checkout/success",
    myOrders: "/orders",
    singleOrder: "/orders/[orderId]",
} as const

export { ROUTES, ROUTES_PATH }