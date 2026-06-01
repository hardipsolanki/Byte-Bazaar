import React, { useEffect } from "react";

import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";

import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";
import { FONT_SIZE, FONT_WEIGHT } from "@/theme/typography";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getUserSingleOrder } from "@/features/orderSlice";
import PageHeader from "@/components/common/PageHeader";
import OrderDetailsSkeleton from "@/components/skeletons/singleOrderSkeleton";

const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "#F59E0B";

    case "DELIVERED":
      return "#22C55E";

    case "CANCELLED":
      return "#EF4444";

    default:
      return COLORS.primary;
  }
};

const ProductCard = ({ item }: any) => {
  return (
    <Pressable style={styles.productCard}>
      <Image
        source={{ uri: item.product.mainImage }}
        style={styles.productImage}
      />

      <View style={styles.productInfo}>
        <Text numberOfLines={1} style={styles.productName}>
          {item.product.name}
        </Text>

        <Text style={styles.productMeta}>Quantity: {item.quantity}</Text>

        <Text style={styles.productPrice}>Price: ₹{item.product.price}</Text>
      </View>
    </Pressable>
  );
};

const OrderDetailsScreen = () => {
  const dispatch = useAppDispatch();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const { userSingleOrder, loading } = useAppSelector(({ orders }) => orders);
  useEffect(() => {
    if (!orderId) return;

    dispatch(getUserSingleOrder(orderId));
  }, [dispatch, orderId]);

  if (loading === "idle" || loading === "pending")
    return <OrderDetailsSkeleton />;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <PageHeader title={`# ${userSingleOrder?._id}`} />
      {/* Products */}
      <FlatList
        data={userSingleOrder?.order}
        keyExtractor={(item) => item.product._id}
        ItemSeparatorComponent={() => <View style={{ height: SPACING.md }} />}
        renderItem={({ item }) => <ProductCard item={item} />}
        ListFooterComponent={
          <>
            {/* Payment Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Payment & Order Details</Text>

              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Payment Status:</Text>

                  <Text
                    style={[
                      styles.paymentStatus,
                      {
                        color: getStatusColor(
                          userSingleOrder?.status as string,
                        ),
                      },
                    ]}
                  >
                    {userSingleOrder?.status}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Payment Method:</Text>

                  <Text style={styles.detailValue}>
                    {userSingleOrder?.paymentType}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Order Price:</Text>

                  <Text style={styles.detailValue}>
                    ₹{userSingleOrder?.orderPrice}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Cart Total:</Text>

                  <Text style={styles.detailValue}>
                    ₹{userSingleOrder?.cartTotal}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Discount Applied:</Text>

                  <Text style={styles.discountText}>
                    ₹{userSingleOrder?.discountValue}
                  </Text>
                </View>
              </View>
            </View>

            {/* Order Status */}
            <View style={styles.statusCard}>
              <View style={styles.statusTopRow}>
                <View style={styles.statusIconContainer}>
                  <Ionicons
                    name="car-sport-outline"
                    size={18}
                    color={COLORS.yellow}
                  />
                </View>

                <View>
                  <Text style={styles.statusTitle}>
                    {userSingleOrder?.status}
                  </Text>
                </View>
              </View>

              <View style={styles.pendingBanner}>
                <Feather name="clock" size={16} color={COLORS.white} />

                <Text style={styles.pendingBannerText}>
                  Your order is pending and will be processed soon.
                </Text>
              </View>
            </View>

            {/* Delivery Address */}
            <View style={styles.addressCard}>
              <View style={styles.addressHeader}>
                <MaterialIcons name="location-on" size={20} color="#DC2626" />

                <Text style={styles.addressTitle}>Delivered Location</Text>
              </View>

              <Text style={styles.addressText}>
                {userSingleOrder?.address.addressLine},{" "}
                {userSingleOrder?.address.city},{" "}
                {userSingleOrder?.address.state},{" "}
                {userSingleOrder?.address.country} -{" "}
                {userSingleOrder?.address.pincode}
              </Text>
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    padding: SPACING.lg,
    paddingBottom: 120,
  },

  header: {
    marginBottom: SPACING.xl,
  },

  headerTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: SPACING.xs,
  },

  orderId: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
  },

  productCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    margin: SPACING.sm,
  },

  productImage: {
    width: 90,
    height: 90,
    borderRadius: RADIUS.md,
    resizeMode: "cover",
  },

  productInfo: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: "center",
  },

  productName: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: SPACING.xs,
  },

  productMeta: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
    marginBottom: 2,
  },

  productPrice: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },

  section: {
    marginTop: SPACING["3xl"],
    margin: SPACING.sm,
  },

  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: SPACING.lg,
  },

  detailsContainer: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    gap: SPACING.md,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  detailLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
  },

  detailValue: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },

  paymentStatus: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },

  discountText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.success,
  },

  statusCard: {
    marginTop: SPACING["3xl"],
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    margin: SPACING.sm,
  },

  statusTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: "#FEF3C7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },

  statusTitle: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },

  statusDate: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
    marginTop: 2,
  },

  pendingBanner: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.yellow,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
  },

  pendingBannerText: {
    flex: 1,
    marginLeft: SPACING.sm,
    color: COLORS.white,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },

  addressCard: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    margin: SPACING.sm,
  },

  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },

  addressTitle: {
    marginLeft: SPACING.sm,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },

  addressText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
    lineHeight: 22,
  },
});
