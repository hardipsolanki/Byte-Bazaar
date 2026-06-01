import React from "react";

import { FlatList, StyleSheet, View } from "react-native";

import { Skeleton } from "moti/skeleton";

import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";

const productSkeletons = [1, 2, 3];

const OrderDetailsSkeleton = () => {
  return (
    <FlatList
      data={productSkeletons}
      keyExtractor={(item) => item.toString()}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      renderItem={() => (
        <View style={styles.productCard}>
          <Skeleton
            width={90}
            height={90}
            radius={RADIUS.md}
            colorMode="light"
          />

          <View style={styles.productInfo}>
            <Skeleton
              width={"90%"}
              height={16}
              radius={4}
              colorMode="light"
            />

            <View style={{ height: 10 }} />

            <Skeleton
              width={100}
              height={12}
              radius={4}
              colorMode="light"
            />

            <View style={{ height: 8 }} />

            <Skeleton
              width={80}
              height={12}
              radius={4}
              colorMode="light"
            />
          </View>
        </View>
      )}
      ListHeaderComponent={
        <View style={styles.header}>
          <Skeleton
            width={180}
            height={24}
            radius={6}
            colorMode="light"
          />
        </View>
      }
      ListFooterComponent={
        <>
          {/* Payment Details */}
          <View style={styles.section}>
            <Skeleton
              width={180}
              height={20}
              radius={4}
              colorMode="light"
            />

            <View style={styles.card}>
              {[1, 2, 3, 4, 5].map((item) => (
                <View key={item} style={styles.row}>
                  <Skeleton
                    width={120}
                    height={14}
                    radius={4}
                    colorMode="light"
                  />

                  <Skeleton
                    width={80}
                    height={14}
                    radius={4}
                    colorMode="light"
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Status Card */}
          <View style={styles.statusCard}>
            <View style={styles.statusRow}>
              <Skeleton
                width={42}
                height={42}
                radius={21}
                colorMode="light"
              />

              <View style={{ marginLeft: SPACING.md }}>
                <Skeleton
                  width={120}
                  height={16}
                  radius={4}
                  colorMode="light"
                />
              </View>
            </View>

            <View style={{ marginTop: SPACING.lg }}>
              <Skeleton
                width={"100%"}
                height={40}
                radius={RADIUS.md}
                colorMode="light"
              />
            </View>
          </View>

          {/* Address */}
          <View style={styles.addressCard}>
            <View style={styles.addressHeader}>
              <Skeleton
                width={20}
                height={20}
                radius={10}
                colorMode="light"
              />

              <View style={{ marginLeft: SPACING.sm }}>
                <Skeleton
                  width={140}
                  height={16}
                  radius={4}
                  colorMode="light"
                />
              </View>
            </View>

            <View style={{ marginTop: SPACING.md }}>
              <Skeleton
                width={"100%"}
                height={14}
                radius={4}
                colorMode="light"
              />

              <View style={{ height: 8 }} />

              <Skeleton
                width={"80%"}
                height={14}
                radius={4}
                colorMode="light"
              />
            </View>
          </View>
        </>
      }
    />
  );
};

export default OrderDetailsSkeleton;

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    paddingBottom: 120,
  },

  header: {
    marginBottom: SPACING.xl,
  },

  productCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },

  productInfo: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: "center",
  },

  section: {
    marginTop: SPACING["3xl"],
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginTop: SPACING.lg,
    gap: SPACING.md,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statusCard: {
    marginTop: SPACING["3xl"],
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  addressCard: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
  },

  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
});