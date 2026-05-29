import React from "react";
import { View, StyleSheet } from "react-native";

import { Skeleton } from "moti/skeleton";

import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/theme/sizes";
import { SPACING } from "@/theme/spacing";

export default function HeroBannerSkeleton() {
  return (
    <View style={styles.container}>
      {/* Banner */}
      <Skeleton
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT / 5}
        radius={0}
        colorMode="light"
      />

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {[1, 2, 3].map((item) => (
          <Skeleton
            key={item}
            width={8}
            height={8}
            radius={"round"}
            colorMode="light"
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
  },

  dotsContainer: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    flexDirection: "row",
    gap: SPACING.sm,
  },
});