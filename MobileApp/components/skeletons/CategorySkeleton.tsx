import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { Skeleton } from "moti/skeleton";

import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";

const skeletonData = [1, 2, 3, 4, 5, 6];

export default function CategorySkeleton() {
  return (
    <FlatList
      data={skeletonData}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.toString()}
      renderItem={() => (
        <View style={styles.categoryItem}>
          <Skeleton
            width={80}
            height={18}
            radius={6}
            colorMode="light"
          />
        </View>
      )}
      ItemSeparatorComponent={() => (
        <View style={{ width: SPACING.lg }} />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginVertical: SPACING.sm,
    borderColor: COLORS.border,
    borderWidth: 1,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: "center",
  },

  categoryItem: {
    justifyContent: "center",
    alignItems: "center",
  },
});