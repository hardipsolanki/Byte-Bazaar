interface CreatedBy {
    _id: string;
    fullName: string;
    avatar: string;
}

export interface Coupon {
    _id: string;
    couponCode: string;
    user: CreatedBy;
    discountPercentage: number;
    isActive: boolean;
    minCartValue: number;
    expiryTime: string;
    limit: number;
    isExpire: boolean;
    usedFrom: number;
}
export interface ApplyCouponres {
    message: string;
    statusCode: number;
    success: boolean;
}
