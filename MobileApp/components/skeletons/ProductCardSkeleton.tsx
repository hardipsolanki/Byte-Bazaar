// components/skeletons/ProductCardSkeleton.tsx

import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";

import { Skeleton } from "moti/skeleton";

import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";
import { SCREEN_WIDTH } from "@/theme/sizes";

const skeletonData = [1, 2, 3, 4, 5, 6];

export default function ProductCardSkeleton() {
  return (
    <FlatList
      data={skeletonData}
      keyExtractor={(item) => item.toString()}
      showsVerticalScrollIndicator={false}
    //   columnWrapperStyle={styles.row}
      renderItem={() => (
        <View style={styles.card}>
          {/* Product Image */}
          <Skeleton
            width={"100%"}
            height={170}
            radius={0}
            colorMode="light"
          />

          <View style={styles.content}>
            {/* Product Name Line 1 */}
            <Skeleton
              width={"95%"}
              height={14}
              radius={4}
              colorMode="light"
            />

            <View style={{ height: 8 }} />

            {/* Product Name Line 2 */}
            <Skeleton
              width={"75%"}
              height={14}
              radius={4}
              colorMode="light"
            />

            <View style={{ height: 14 }} />

            {/* Price */}
            <Skeleton
              width={70}
              height={22}
              radius={6}
              colorMode="light"
            />

            <View style={{ height: 14 }} />

            {/* Rating Row */}
            <View style={styles.ratingRow}>
              {/* Rating Badge */}
              <Skeleton
                width={42}
                height={28}
                radius={8}
                colorMode="light"
              />

              {/* Rating Text */}
              <Skeleton
                width={60}
                height={14}
                radius={4}
                colorMode="light"
              />
            </View>
          </View>
        </View>
      )}
      ItemSeparatorComponent={() => (
        <View style={{ height: SPACING.md }} />
      )}
      contentContainerStyle={{
        paddingBottom: SPACING.xl,
      }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: SPACING.md,
    width: SCREEN_WIDTH,

    backgroundColor: COLORS.white,

    borderWidth: 1,
    borderColor: COLORS.border,

    borderRadius: RADIUS.lg,

    overflow: "hidden",
  },

  content: {
    padding: SPACING.md,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
});