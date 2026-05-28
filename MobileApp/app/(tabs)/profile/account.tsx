import React, { useMemo, useRef } from "react";

import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { Feather } from "@expo/vector-icons";

import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";

import { TEXTS } from "@/constants/plainText";
import { FONT_SIZE, FONT_WEIGHT } from "@/theme/typography";
import { useAppSelector } from "@/store/hooks";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import EditProfileBottomSheet from "@/components/sheet/UpdateUserProfile";

const Account = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["80%"], []);
  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.dismiss();
  };

  const { userData } = useAppSelector(({ users }) => users);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{TEXTS.ACCOUNT.TITLE}</Text>
        <Text style={styles.subtitle}>{TEXTS.ACCOUNT.SUBTITLE}</Text>
        <View style={styles.divider} />

        {/* Profile Section */}
        <View style={styles.profileContainer}>
          {/* Edit Icon */}
          <Pressable onPress={openBottomSheet} style={styles.editButton}>
            <Feather name="edit-2" size={18} color={COLORS.black} />
          </Pressable>

          {/* Profile Image */}
          <Image
            source={{
              uri: userData?.avatar,
            }}
            style={styles.profileImage}
          />

          {/* User Info */}
          <View style={styles.infoContainer}>
            <View style={styles.textRow}>
              <Text style={styles.label}>{TEXTS.ACCOUNT.FULL_NAME}</Text>
              <Text style={styles.value}>{userData?.fullName}</Text>
            </View>

            <View style={styles.textRow}>
              <Text style={styles.label}>{TEXTS.ACCOUNT.EMAIL}</Text>
              <Text style={styles.value}>{userData?.email}</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.label}>{TEXTS.ACCOUNT.PHONE}</Text>
              <Text style={styles.value}>{userData?.phoneNumber}</Text>
            </View>
          </View>
        </View>
      </View>
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.4}
            pressBehavior="close"
          />
        )}
      >
        <EditProfileBottomSheet onClose={closeBottomSheet} />
      </BottomSheetModal>
    </>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.white,
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
    marginVertical: SPACING.xl,
  },

  profileContainer: {
    alignItems: "center",
  },

  editButton: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 10,
  },

  profileImage: {
    width: 130,
    height: 130,
    borderRadius: RADIUS.full,
  },

  infoContainer: {
    marginTop: SPACING.md,
    gap: SPACING.xs,
    alignItems: "center",
  },
  textRow: {
    flexDirection: "row",
  },
  label: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
    textAlign: "center",
    lineHeight: 20,
  },

  value: {
    fontWeight: FONT_WEIGHT.regular,
  },
});
