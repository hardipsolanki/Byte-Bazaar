import React from "react";

import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";

import { Skeleton } from "moti/skeleton";

import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";

const skeletonOrders = [1, 2, 3];

const OrderItemSkeleton = () => {
  return (
    <View style={styles.productCard}>
      {/* Product Image */}
      <Skeleton
        width={110}
        height={110}
        radius={12}
        colorMode="light"
      />

      {/* Product Info */}
      <View style={styles.productInfo}>
        <View>
          <Skeleton
            width={"90%"}
            height={16}
            radius={6}
            colorMode="light"
          />

          <View style={{ height: SPACING.sm }} />

          <Skeleton
            width={"70%"}
            height={16}
            radius={6}
            colorMode="light"
          />
        </View>

        <View style={styles.productBottomRow}>
          <Skeleton
            width={60}
            height={18}
            radius={6}
            colorMode="light"
          />

          <Skeleton
            width={70}
            height={30}
            radius={999}
            colorMode="light"
          />
        </View>
      </View>
    </View>
  );
};

const OrderCardSkeleton = () => {
  return (
    <View style={styles.orderCard}>

      {/* Header */}
      <View style={styles.orderHeader}>
        <View>
          <Skeleton
            width={90}
            height={14}
            radius={6}
            colorMode="light"
          />

          <View style={{ height: SPACING.sm }} />

          <Skeleton
            width={130}
            height={18}
            radius={6}
            colorMode="light"
          />
        </View>

        <View>
          <Skeleton
            width={70}
            height={16}
            radius={6}
            colorMode="light"
          />
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Products */}
      <View style={{ gap: SPACING.md }}>
        <OrderItemSkeleton />
        <OrderItemSkeleton />
      </View>
    </View>
  );
};

const OrdersSkeleton = () => {
  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Skeleton
          width={180}
          height={34}
          radius={8}
          colorMode="light"
        />

        <View style={{ height: SPACING.sm }} />

        <Skeleton
          width={240}
          height={16}
          radius={6}
          colorMode="light"
        />
      </View>

      {/* Skeleton Orders */}
      <FlatList
        data={skeletonOrders}
        keyExtractor={(item) => item.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={{ height: SPACING.xl }} />
        )}
        renderItem={() => <OrderCardSkeleton />}
      />

    </SafeAreaView>
  );
};

export default OrdersSkeleton;

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.white,
  },

  listContainer: {
    padding: SPACING.lg,
    paddingBottom: 120,
  },

  orderCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
  },

  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: SPACING.lg,
  },

  productCard: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderRadius: RADIUS.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: SPACING.sm,
    gap: SPACING.md,
  },

  productInfo: {
    flex: 1,
    justifyContent: "space-between",
  },

  productBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

});