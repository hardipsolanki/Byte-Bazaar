import { PaymentMethodType } from "@/types/checkout";


export const paymentMethods = [
  {
    id: "1",
    type: "COD" as PaymentMethodType,
    title: "Cash on Delivery",
    subtitle: "Pay with cash upon delivery.",
    icon: "cash",
    iconBg: "#22C55E",
  },
  {
    id: "2",
    type: "STRIPE" as PaymentMethodType,
    title: "Pay Online - Credit/Debit Card",
    subtitle: "Pay securely using Stripe.",
    icon: "alpha-s",
    iconBg: "#6366F1",
  },
];