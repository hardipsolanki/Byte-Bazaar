import React, { useEffect } from "react";

import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  Feather,
  Ionicons,
} from "@expo/vector-icons";

import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";

import {
  FONT_SIZE,
  FONT_WEIGHT,
} from "@/theme/typography";

import { TEXTS } from "@/constants/plainText";

import Button from "@/components/common/Button";

import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks";

import { getAddresses } from "@/features/addressSlice";

const Address = () => {
  const dispatch = useAppDispatch();

  const { addresses, loading } = useAppSelector(
    ({ addresses }) => addresses
  );

  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  const renderAddressItem = ({ item }: any) => {
    return (
      <View style={styles.card}>
        {/* Edit Button */}
        <Pressable style={styles.editButton}>
          <Feather
            name="edit-2"
            size={18}
            color={COLORS.black}
          />
        </Pressable>

        {/* Location Icon */}
        <View style={styles.iconContainer}>
          <Ionicons
            name="location-outline"
            size={60}
          />
        </View>

        {/* Address Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.addressType}>
            {item.isPrimary
              ? TEXTS.ADDRESS.HOME
              : TEXTS.ADDRESS.OTHER}
          </Text>

          <Text style={styles.addressText}>
            {item.addressLine}
          </Text>

          <Text style={styles.addressText}>
            {item.city}, {item.state}
          </Text>

          <Text style={styles.addressText}>
            {item.country} - {item.pincode}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          {TEXTS.ADDRESS.TITLE}
        </Text>

        <Text style={styles.subtitle}>
          {TEXTS.ADDRESS.SUBTITLE}
        </Text>

        <View style={styles.divider} />
      </View>

      {/* Address List */}
      <FlatList
        data={addresses}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={renderAddressItem}
        ListFooterComponent={
          <Button
            title={TEXTS.ADDRESS.ADD_NEW}
            onPress={() => {}}
            style={styles.addButton}
          />
        }
      />
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    margin: SPACING.lg,
    borderColor: COLORS.white,
  },

  header: {
    backgroundColor: COLORS.white,
  },

  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
    textAlign: "center",
  },

  subtitle: {
    marginTop: SPACING.sm,
    fontSize: FONT_SIZE.md,
    color: COLORS.gray,
    textAlign: "center",
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: SPACING.xl,
    marginTop: SPACING.sm,
  },

  listContent: {
    paddingBottom: SPACING.xl,
  },

  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    position: "relative",
    alignItems: "center",
  },

  editButton: {
    position: "absolute",
    right: SPACING.md,
    top: SPACING.lg,
    zIndex: 10,
  },

  iconContainer: {
    marginBottom: SPACING.md,
  },

  infoContainer: {
    alignItems: "center",
    gap: SPACING.xs,
  },

  addressType: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
    marginBottom: SPACING.sm,
  },

  addressText: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.regular,
    color: COLORS.gray,
    textAlign: "center",
    lineHeight: 20,
  },

  addButton: {
    marginTop: SPACING.sm,
  },
});