import { ROUTES } from "@/constants";
import { store } from "@/store/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function RootLayout() {
  return (
    <StripeProvider 
    merchantIdentifier="merchant.com.MobileApp" 
    publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY as any}
    >
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <Stack>
              <Stack.Screen
                name={ROUTES.tabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={ROUTES.auth.SIGNUP}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={ROUTES.auth.LOGIN}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={ROUTES.INDEX}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={ROUTES.productDetails}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={ROUTES.cart}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={ROUTES.addressCheckout}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={ROUTES.paymentCheckout}
                options={{ headerShown: false }}
              />
            </Stack>
            <Toast />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </Provider>
    </StripeProvider>
  );
}
