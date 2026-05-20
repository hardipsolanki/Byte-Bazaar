import { ROUTES } from "@/constants";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name={ROUTES.INDEX} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.auth.SIGNUP} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.auth.LOGIN} options={{ headerShown: false }} />
    </Stack>
  );
}
