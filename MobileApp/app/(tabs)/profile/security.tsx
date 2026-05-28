import React, { useState } from "react";

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Feather } from "@expo/vector-icons";

import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";

import { FONT_SIZE, FONT_WEIGHT } from "@/theme/typography";

import { TEXTS } from "@/constants/plainText";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logOutUser } from "@/features/authSlice";
import { useRouter } from "expo-router";
import { ROUTES_PATH } from "@/constants";

const Security = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loading = useAppSelector((state) => state.users.loading);
  const logoutHandler = () => {
    dispatch(logOutUser())
      .unwrap()
      .then(() => {
        router.replace(ROUTES_PATH.auth.LOGIN);
      });
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{TEXTS.SECURITY.TITLE}</Text>

        <Text style={styles.subtitle}>{TEXTS.SECURITY.SUBTITLE}</Text>

        <View style={styles.divider} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Change Password Card */}
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Feather name="lock" size={30} />
          </View>

          <Text style={styles.cardTitle}>{TEXTS.SECURITY.CHANGE_PASSWORD}</Text>

          <Text style={styles.cardSubtitle}>
            {TEXTS.SECURITY.CHANGE_PASSWORD_SUBTITLE}
          </Text>

          <View style={styles.inputContainer}>
            <Input
              placeholder="Old password"
              placeholderTextColor={COLORS.gray}
              label={TEXTS.SECURITY.OLD_PASSWORD}
            />
          </View>

          <View style={styles.inputContainer}>
            <Input
              placeholder="New password"
              placeholderTextColor={COLORS.gray}
              label={TEXTS.SECURITY.NEW_PASSWORD}
            />
          </View>

          <View style={styles.inputContainer}>
            <Input
              placeholder="Confirm password"
              placeholderTextColor={COLORS.gray}
              label={TEXTS.SECURITY.CONFIRM_PASSWORD}
            />
          </View>

          <Button
            onPress={() => {}}
            title={TEXTS.SECURITY.UPDATE_PASSWORD}
            style={styles.updatedBtn}
          />

          {/* Logout Card */}
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Feather name="log-out" size={30} color={COLORS.error} />
            </View>

            <Text style={styles.cardTitle}>{TEXTS.SECURITY.LOGOUT}</Text>

            <Text style={styles.cardSubtitle}>
              {TEXTS.SECURITY.LOGOUT_SUBTITLE}
            </Text>

            <Pressable
              disabled={loading === "pending"}
              onPress={logoutHandler}
              style={styles.logoutButton}
            >
              <Text style={styles.logoutButtonText}>
                {TEXTS.SECURITY.LOGOUT}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Security;

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

  card: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderBottomEndRadius: RADIUS.lg,
    borderBottomStartRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },

  iconContainer: {
    alignItems: "center",
    marginBottom: SPACING.sm,
  },

  cardTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
    textAlign: "center",
  },

  cardSubtitle: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.regular,
    color: COLORS.gray,
    textAlign: "center",
    lineHeight: 18,
  },

  inputContainer: {
    marginTop: SPACING.md,
  },

  updatedBtn: {
    marginTop: SPACING.md,
  },

  logoutButton: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.error,
    borderRadius: RADIUS.md,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },

  logoutButtonText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.white,
  },
});
