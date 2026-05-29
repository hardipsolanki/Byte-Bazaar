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

const skeletonData = [1, 2, 3];

const CartSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* Product Title */}
      <Skeleton
        width={160}
        height={24}
        radius={8}
        colorMode="light"
      />

      {/* Product Cards */}
      <FlatList
        data={skeletonData}
        keyExtractor={(item) => item.toString()}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={() => (
          <View style={styles.card}>
            {/* Top Row */}
            <View style={styles.productRow}>
              {/* Image */}
              <Skeleton
                width={90}
                height={90}
                radius={12}
                colorMode="light"
              />

              {/* Details */}
              <View style={styles.detailsContainer}>
                <Skeleton
                  width={"90%"}
                  height={18}
                  radius={6}
                  colorMode="light"
                />

                <View style={styles.spacingSm} />

                <Skeleton
                  width={100}
                  height={14}
                  radius={6}
                  colorMode="light"
                />

                <View style={styles.spacingXs} />

                <Skeleton
                  width={120}
                  height={14}
                  radius={6}
                  colorMode="light"
                />

                <View style={styles.spacingSm} />

                <Skeleton
                  width={80}
                  height={18}
                  radius={6}
                  colorMode="light"
                />
              </View>
            </View>

            {/* Update Button */}
            <View style={styles.buttonSpacing}>
              <Skeleton
                width={"100%"}
                height={45}
                radius={12}
                colorMode="light"
              />
            </View>

            {/* Remove Button */}
            <View style={styles.spacingMd}>
              <Skeleton
                width={"100%"}
                height={45}
                radius={12}
                colorMode="light"
              />
            </View>
          </View>
        )}
      />

      {/* Price Details */}
      <View style={styles.priceContainer}>
        <Skeleton
          width={140}
          height={22}
          radius={8}
          colorMode="light"
        />

        <View style={styles.priceBox}>
          <Skeleton
            width={"100%"}
            height={18}
            radius={6}
            colorMode="light"
          />

          <View style={styles.spacingMd} />

          <Skeleton
            width={"100%"}
            height={18}
            radius={6}
            colorMode="light"
          />

          <View style={styles.spacingLg} />

          <Skeleton
            width={"100%"}
            height={20}
            radius={6}
            colorMode="light"
          />
        </View>

        {/* Coupon */}
        <View style={styles.couponContainer}>
          <Skeleton
            width={"70%"}
            height={45}
            radius={10}
            colorMode="light"
          />

          <Skeleton
            width={90}
            height={45}
            radius={10}
            colorMode="light"
          />
        </View>

        {/* Checkout */}
        <View style={styles.spacingLg}>
          <Skeleton
            width={"100%"}
            height={48}
            radius={12}
            colorMode="light"
          />
        </View>
      </View>
    </View>
  );
};

export default CartSkeleton;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    margin: SPACING.lg,
  },

  listContent: {
    paddingTop: SPACING.lg,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },

  productRow: {
    flexDirection: "row",
    gap: SPACING.md,
  },

  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },

  buttonSpacing: {
    marginTop: SPACING.lg,
  },

  priceContainer: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
  },

  priceBox: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginTop: SPACING.lg,
  },

  couponContainer: {
    flexDirection: "row",
    gap: SPACING.md,
    marginTop: SPACING.xl,
  },

  spacingXs: {
    marginTop: SPACING.xs,
  },

  spacingSm: {
    marginTop: SPACING.sm,
  },

  spacingMd: {
    marginTop: SPACING.md,
  },

  spacingLg: {
    marginTop: SPACING.lg,
  },
});