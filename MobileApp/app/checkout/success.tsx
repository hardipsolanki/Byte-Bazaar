import React, { useEffect, useRef } from "react";

import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";
import { ROUTES_PATH } from "@/constants";

export default function PaymentSuccessScreen() {

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const pingAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {

    // success icon animation
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
    }).start();

    // ping animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pingAnim, {
          toValue: 1.6,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pingAnim, {
          toValue: 1,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

  }, []);

  return (
    <SafeAreaView style={styles.container}>

      {/* Success Icon */}
      <View style={styles.iconContainer}>

        {/* Ping Circle */}
        <Animated.View
          style={[
            styles.pingCircle,
            {
              transform: [{ scale: pingAnim }],
              opacity: pingAnim.interpolate({
                inputRange: [1, 1.6],
                outputRange: [0.4, 0],
              }),
            },
          ]}
        />

        {/* Main Circle */}
        <Animated.View
          style={[
            styles.successCircle,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Ionicons
            name="checkmark"
            size={48}
            color={COLORS.white}
          />
        </Animated.View>

      </View>

      {/* Content */}
      <View style={styles.content}>

        <Text style={styles.title}>
          Order Confirmed!
        </Text>

        <Text style={styles.subtitle}>
          Thank you for your purchase
        </Text>

        <Text style={styles.description}>
          We'll send you shipping updates via email
        </Text>

      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>

        {/* View Orders */}
        <Pressable
          style={styles.primaryButton}
          onPress={() => {
            router.push(ROUTES_PATH.myOrders);
          }}
        >
          <Text style={styles.primaryButtonText}>
            View Orders
          </Text>
        </Pressable>

        {/* Continue Shopping */}
        <Pressable
          style={styles.secondaryButton}
          onPress={() => {
            router.replace(ROUTES_PATH.home);
          }}
        >
          <Text style={styles.secondaryButtonText}>
            Continue Shopping
          </Text>
        </Pressable>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
  },

  iconContainer: {
    marginBottom: SPACING["3xl"],
    justifyContent: "center",
    alignItems: "center",
  },

  pingCircle: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 999,
    backgroundColor: "rgba(34,197,94,0.25)",
  },

  successCircle: {
    width: 110,
    height: 110,
    borderRadius: 999,
    backgroundColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#22C55E",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },

  content: {
    alignItems: "center",
    marginBottom: SPACING["3xl"],
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: SPACING.sm,
  },

  subtitle: {
    fontSize: 18,
    color: "#475569",
    marginBottom: SPACING.md,
  },

  description: {
    fontSize: 14,
    color: "#94A3B8",
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: SPACING.lg,
    width: "100%",
  },

  buttonContainer: {
    width: "100%",
    gap: SPACING.md,
  },

  primaryButton: {
    backgroundColor: "#0F172A",
    paddingVertical: 16,
    borderRadius: RADIUS.xl,
    justifyContent: "center",
    alignItems: "center",
  },

  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },

  secondaryButton: {
    borderWidth: 2,
    borderColor: "#E2E8F0",
    paddingVertical: 16,
    borderRadius: RADIUS.xl,
    justifyContent: "center",
    alignItems: "center",
  },

  secondaryButtonText: {
    color: "#475569",
    fontSize: 16,
    fontWeight: "600",
  },

});
