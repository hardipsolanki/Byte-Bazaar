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

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";
import { FONT_SIZE, FONT_WEIGHT } from "@/theme/typography";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getUserOrders } from "@/features/orderSlice";
import OrdersSkeleton from "@/components/skeletons/ordersSkeleton";
import { useRouter } from "expo-router";
import { ROUTES_PATH } from "@/constants";
import PageHeader from "@/components/common/PageHeader";

const orders = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { userOrders, loading } = useAppSelector(({ orders }) => orders);
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  if (loading === "pending") return <OrdersSkeleton />;

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

  function OrderItemCard({ item, orderId }: any) {
    return (
      <Pressable
        onPress={() => {
          return router.push({
            pathname: ROUTES_PATH.singleOrder,
            params: {
              orderId: orderId,
            },
          });
        }}
        style={styles.productCard}
      >
        <Image source={{ uri: item.mainImage }} style={styles.productImage} />

        <View style={styles.productInfo}>
          <Text numberOfLines={2} style={styles.productName}>
            {item.name}
          </Text>
        </View>
      </Pressable>
    );
  }

  function OrderCard({ order }: any) {
    return (
      <View style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderDate}>{order.createdAt}</Text>

            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Status:</Text>

              <Text
                style={[
                  styles.statusText,
                  {
                    color: getStatusColor(order.status),
                  },
                ]}
              >
                {order.status}
              </Text>
            </View>
          </View>

          <View style={styles.rightHeader}>
            <Text style={styles.totalItems}>{order.totalItems} Items</Text>
          </View>
        </View>
        {/* Divider */}
        <View style={styles.divider} />
        {/* Products */}
        <FlatList
          data={order.products}
          keyExtractor={(item) => item._id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={{ height: SPACING.md }} />}
          renderItem={({ item }) => (
            <OrderItemCard item={item} orderId={order._id} />
          )}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <PageHeader title="My Orders" />
      {/* Orders */}
      <FlatList
        data={userOrders}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: SPACING.xl }} />}
        renderItem={({ item }) => <OrderCard order={item} />}
      />
    </SafeAreaView>
  );
};

export default orders;

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

  headerTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
  },

  headerSubtitle: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZE.md,
    color: COLORS.gray,
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

  orderDate: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
    marginBottom: SPACING.xs,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  statusLabel: {
    fontSize: FONT_SIZE.sm,
    fontWeight: "600",
  },

  statusText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },

  rightHeader: {
    alignItems: "flex-end",
  },

  totalItems: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
    marginBottom: 2,
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: SPACING.lg,
  },

  productCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  productImage: {
    width: 110,
    height: 110,
    resizeMode: "cover",
  },

  productInfo: {
    flex: 1,
    padding: SPACING.md,
    justifyContent: "space-between",
  },

  productName: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
    lineHeight: 22,
  },
});
