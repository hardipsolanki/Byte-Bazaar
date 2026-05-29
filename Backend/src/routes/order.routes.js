import { Router } from "express";
import { verifyJWT, verifyPermisson } from "../middlewares/auth.middleware.js";
import {
    createOrder,
    getUserOrders,
    getOrdersByAdmin,
    getSingleOrderByAdmin,
    updateOrderStatusAndIsPaymentDone,
    verifyStripePayment,
    getUserSingleOrder,
    initializedPaymentSheeet,
    stripeWebhook,
} from "../controllers/order.controller.js";
import {
    createOrderValidator,
    updateOrderStatusAndIsPaymentDoneValidator
} from "../validators/order/order.validators.js";
import { validate } from "../validators/validate.js";
import { userRole } from "../constant.js";
import express from "express";
const router = Router()


router.route("/create-order-web/:addressId")
    .post(verifyJWT, createOrderValidator(), validate, createOrder)

router.route("/create-order-mobile/:addressId")
    .post(verifyJWT, createOrderValidator(), validate, initializedPaymentSheeet)
router.route("/webhook")
    .post(express.raw({ type: "application/json" }), stripeWebhook)

router.route("/stripe-payment-verify")
    .get(verifyStripePayment)

router.route("/admin")
    .get(verifyJWT, verifyPermisson(userRole.ADMIN), getOrdersByAdmin)

router.route("/admin/:orderId")
    .get(
        verifyJWT,
        verifyPermisson(userRole.ADMIN),
        getSingleOrderByAdmin
    )
    .patch(
        verifyJWT,
        verifyPermisson(userRole.ADMIN),
        updateOrderStatusAndIsPaymentDoneValidator(),
        validate,
        updateOrderStatusAndIsPaymentDone
    )

router.route("/user-orders").get(verifyJWT, getUserOrders)

router.route("/user-orders/:orderId").get(verifyJWT, getUserSingleOrder)


export default router