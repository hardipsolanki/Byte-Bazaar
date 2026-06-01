export interface Order {
    _id: string;
    orderPrice: number;
    user: {
        _id: string;
        fullName: string;
        avatar: string;
    };
    paymentType: "COD" | "STRIPE";
    status: string;
    isPaymentDone: boolean;
    createdAt: string;
    totalItems: number;
}

export interface UserOrder {
    _id: string;
    status: "PENDING" | "DELIVERED" | "CANCELLED";
    totalItems: number;
    products: [
        {
            _id: string;
            name: string;
            mainImage: string;
            slug: string;
        }
    ]
}
export interface UserSingleOrder {
    _id: string;
    order: [
        {
            product: {
                _id: string;
                name: string;
                mainImage: string;
                price: number;
            },
            quantity: number;
        }
    ],
    isPaymentDone: boolean;
    paymentType: "COD" | "STRIPE";
    status: "PENDING" | "DELIVERED" | "CANCELLED";
    orderPrice: number;
    cartTotal: number;
    address: {
        _id: string;
        addressLine: string;
        country: string;
        state: string;
        city: string;
        pincode: string;
        isPrimary: boolean;
    },
    coupon: {
        _id: string;
        couponCode: string;
        discountPercentage: number;
    },
    discountValue: number
}

export interface CreateOrderReq {
    addressId: string;
    paymentType: "COD" | "STRIPE"
}
export interface CreateOrderRes {
        clientSecret: string
    statusCode: number;
    message: string;
    success: boolean
}

export interface GetUserOrdersRes {
    statusCode: number;
    message: string;
    success: boolean;
    data: {
        orders: UserOrder[]
    }

}
export interface GetUserSingleOrderRes {
    data: UserSingleOrder
    statusCode: number;
    message: string;
    success: boolean
}
