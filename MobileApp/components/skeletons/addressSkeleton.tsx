import React from "react";

import { StyleSheet, View } from "react-native";

import { Skeleton } from "moti/skeleton";

import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";

const skeletonData = [1, 2, 3];

const AddressSkeleton = () => {
  return (
    <View style={styles.container}>
      {skeletonData.map((item) => (
        <View key={item} style={styles.card}>
          {/* Radio Button Skeleton */}
          <Skeleton
            width={24}
            height={24}
            radius={"round"}
            colorMode="light"
          />

          {/* Address Content */}
          <View style={styles.contentContainer}>
            {/* Address Line */}
            <Skeleton
              width={"70%"}
              height={18}
              radius={6}
              colorMode="light"
            />

            {/* City / State */}
            <Skeleton
              width={"90%"}
              height={16}
              radius={6}
              colorMode="light"
            />

            {/* Country / Pincode */}
            <Skeleton
              width={"75%"}
              height={16}
              radius={6}
              colorMode="light"
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default AddressSkeleton;

const styles = StyleSheet.create({
  container: {
    gap: SPACING.lg,
  },

  card: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.md,
    backgroundColor: COLORS.white,
  },

  contentContainer: {
    flex: 1,
    gap: SPACING.md,
  },
});