import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { TEXTS } from "@/constants/plainText";
import { FONT_SIZE, FONT_WEIGHT } from "@/theme/typography";
import Input from "@/components/common/Input";
import { RADIUS } from "@/theme/radius";
import Button from "@/components/common/Button";
import SocialButton from "@/components/common/SocialButton";
import GoogleImage from "@/assets/svg/Google";
import Facebook from "@/assets/svg/Faceboo";
import { useRouter } from "expo-router";
import { ROUTES_PATH } from "@/constants";

const login = () => {
    const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.loginConatiner}>
          <View style={styles.formConatiner}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{TEXTS.LOGIN.title}</Text>
              <Text style={styles.subtitle}>{TEXTS.LOGIN.subtitle}</Text>
            </View>
            <View style={styles.inputsContainer}>
              <Input
                placeholder={TEXTS.LOGIN.emailPlaceholder}
                label={TEXTS.LOGIN.emailLabel}
              />
              <Input
                placeholder={TEXTS.LOGIN.passwordPlaceholder}
                label={TEXTS.LOGIN.passwordLabel}
                secureTextEntry
              />
              <Button
                title={TEXTS.LOGIN.buttonTitle}
                variant="primary"
                fullWidth
                onPress={() => {}}
              />
            </View>
            <View style={styles.dividerContainer}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>
                {TEXTS.LOGIN.continueWith}
              </Text>
              <View style={styles.line} />
            </View>
            <View style={styles.socialContainer}>
              <SocialButton title="Google" onPress={() => {}}>
                <GoogleImage style={{ width: 20, height: 20 }} />
              </SocialButton>

              <SocialButton title="Facebook" onPress={() => {}}>
                <Facebook style={{ width: 20, height: 20 }} />
              </SocialButton>
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>{TEXTS.LOGIN.footerText}</Text>
              <Pressable onPress={() => router.push(ROUTES_PATH.auth.SIGNUP)}>
                <Text style={styles.signInText}>{TEXTS.LOGIN.signUp}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    marginTop: SPACING.lg,
  },
  keyboardContainer: {
    flex: 1,
  },
  loginConatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formConatiner: {
    width: "90%",
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xs,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
  },
  inputsContainer: {
    marginTop: SPACING.lg,
    gap: SPACING.lg,
  },
  countryCodeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  countryContainer: {
    justifyContent: "space-between",
    gap: SPACING.xs,
    alignItems: "center",
    paddingRight: 12,
  },

  countryNumberText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.gray900,
  },

  countryText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.gray900,
  },

  divider: {
    width: "100%",
    borderColor: COLORS.gray300,
    borderBottomWidth: 1,
    marginTop: 2,
    paddingBottom: SPACING.xs,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray300,
  },

  dividerText: {
    marginHorizontal: 10,
    color: COLORS.gray400,
    paddingHorizontal: 4,
  },
  socialContainer: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    gap: 4,
  },

  footerText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray900,
  },

  signInText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.gray900,
  },
});
