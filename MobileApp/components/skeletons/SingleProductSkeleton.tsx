import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Skeleton } from "moti/skeleton";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";

const SingleProductSkeleton = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* PRODUCT IMAGE */}
        <Skeleton
          colorMode="light"
          width={"100%"}
          height={320}
          radius={12}
        />

        {/* THUMBNAILS */}
        <View style={styles.thumbnailRow}>
          {[1, 2, 3, 4].map((item) => (
            <Skeleton
              key={item}
              colorMode="light"
              width={70}
              height={70}
              radius={10}
            />
          ))}
        </View>

        {/* BUTTONS */}
        <View style={styles.buttonRow}>
          <Skeleton
            colorMode="light"
            width={"48%"}
            height={50}
            radius={10}
          />

          <Skeleton
            colorMode="light"
            width={"48%"}
            height={50}
            radius={10}
          />
        </View>

        {/* TITLE */}
        <Skeleton
          colorMode="light"
          width={"90%"}
          height={35}
          radius={8}
        />

        {/* DESCRIPTION */}
        <View style={styles.descriptionContainer}>
          <Skeleton
            colorMode="light"
            width={"100%"}
            height={18}
          />

          <Skeleton
            colorMode="light"
            width={"95%"}
            height={18}
          />

          <Skeleton
            colorMode="light"
            width={"80%"}
            height={18}
          />
        </View>

        {/* PRICE */}
        <Skeleton
          colorMode="light"
          width={120}
          height={40}
        />

        {/* STOCK */}
        <Skeleton
          colorMode="light"
          width={90}
          height={30}
          radius={100}
        />

        {/* RATING */}
        <View style={styles.ratingRow}>
          <Skeleton
            colorMode="light"
            width={60}
            height={30}
            radius={8}
          />

          <Skeleton
            colorMode="light"
            width={120}
            height={18}
          />
        </View>

        {/* REVIEW TITLE */}
        <Skeleton
          colorMode="light"
          width={220}
          height={28}
        />

        {/* OVERALL RATING */}
        <View style={styles.overallRatingContainer}>
          <Skeleton
            colorMode="light"
            width={60}
            height={45}
          />

          <Skeleton
            colorMode="light"
            width={24}
            height={24}
            radius={100}
          />
        </View>

        {/* REVIEW COUNT */}
        <View style={styles.reviewCountContainer}>
          <Skeleton
            colorMode="light"
            width={120}
            height={16}
          />

          <Skeleton
            colorMode="light"
            width={100}
            height={16}
          />
        </View>

        {/* RATING BARS */}
        <View style={styles.progressSection}>
          {[1, 2, 3, 4, 5].map((item) => (
            <View
              key={item}
              style={styles.progressRow}
            >
              <Skeleton
                colorMode="light"
                width={70}
                height={16}
              />

              <Skeleton
                colorMode="light"
                width={"60%"}
                height={12}
                radius={100}
              />

              <Skeleton
                colorMode="light"
                width={40}
                height={16}
              />
            </View>
          ))}
        </View>

        {/* USER REVIEWS */}
        {[1, 2].map((item) => (
          <View
            key={item}
            style={styles.reviewCard}
          >
            <View style={styles.userRow}>
              <Skeleton
                colorMode="light"
                width={50}
                height={50}
                radius={100}
              />

              <View style={styles.userInfo}>
                <Skeleton
                  colorMode="light"
                  width={140}
                  height={18}
                />

                <Skeleton
                  colorMode="light"
                  width={100}
                  height={14}
                />
              </View>
            </View>

            <View style={styles.commentContainer}>
              <Skeleton
                colorMode="light"
                width={"100%"}
                height={16}
              />

              <Skeleton
                colorMode="light"
                width={"90%"}
                height={16}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleProductSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
    gap: SPACING.lg,
  },

  thumbnailRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  descriptionContainer: {
    gap: SPACING.sm,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },

  overallRatingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.sm,
  },

  reviewCountContainer: {
    alignItems: "center",
    gap: SPACING.sm,
  },

  progressSection: {
    gap: SPACING.md,
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  reviewCard: {
    marginTop: SPACING.md,
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  userInfo: {
    marginLeft: SPACING.md,
    gap: SPACING.sm,
  },

  commentContainer: {
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
});