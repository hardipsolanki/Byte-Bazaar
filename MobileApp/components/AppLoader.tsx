import { COLORS } from "@/theme/colors";
import { RADIUS } from "@/theme/radius";
import { SPACING } from "@/theme/spacing";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import Logo from "@/assets/svg/Logo";

const DOTS = [0, 1, 2];

const AppLoader = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const bounce1 = useRef(new Animated.Value(0)).current;
  const bounce2 = useRef(new Animated.Value(0)).current;
  const bounce3 = useRef(new Animated.Value(0)).current;

  const bounceValues = [bounce1, bounce2, bounce3];

  useEffect(() => {
    // Logo Pulse Animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 700,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 700,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Dot Bounce Animation
    bounceValues.forEach((anim, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 150),

          Animated.timing(anim, {
            toValue: -10,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),

          Animated.timing(anim, {
            toValue: 0,
            duration: 300,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Animated.View
        style={[
          styles.logo,
          {
            transform: [{ scale: pulseAnim }],
          },
        ]}
      >
        <Logo />
      </Animated.View>

      {/* Loader Dots */}
      <View style={styles.dotContainer}>
        {DOTS.map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                transform: [
                  {
                    translateY: bounceValues[index],
                  },
                ],
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default AppLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.lg,
  },

  logo: {
    width: 80,
    height: 80,
  },

  dotContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: RADIUS.full,
    backgroundColor: "#9ca3af",
  },
});
