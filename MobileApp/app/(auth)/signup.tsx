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

const signup = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.signupConatiner}>
            <View style={styles.formConatiner}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{TEXTS.SIGNUP.title}</Text>
                <Text style={styles.subtitle}>{TEXTS.SIGNUP.subtitle}</Text>
              </View>
              <View style={styles.inputsContainer}>
                <Input
                  placeholder={TEXTS.SIGNUP.fullNamePlaceholder}
                  label={TEXTS.SIGNUP.fullNameLabel}
                />
                <Input
                  placeholder={TEXTS.SIGNUP.emailPlaceholder}
                  label={TEXTS.SIGNUP.emailLabel}
                />
                <View style={styles.countryCodeContainer}>
                  <View style={styles.countryContainer}>
                    <View>
                      <Text style={styles.countryText}>
                        {TEXTS.SIGNUP.country}
                      </Text>
                    </View>
                    <View style={styles.divider}>
                      <Text style={styles.countryNumberText}>
                        {TEXTS.SIGNUP.countryCode}
                      </Text>
                    </View>
                  </View>
                  <Input
                    placeholder={TEXTS.SIGNUP.phoneNumberPlaceholder}
                    label={TEXTS.SIGNUP.phoneNumberLabel}
                    keyboardType="numeric"
                    containerStyle={{ flex: 1 }}
                  />
                </View>
                <Input
                  placeholder={TEXTS.SIGNUP.passwordPlaceholder}
                  label={TEXTS.SIGNUP.passwordLabel}
                  secureTextEntry
                />
                <Button
                  title={TEXTS.SIGNUP.buttonTitle}
                  variant="primary"
                  fullWidth
                  onPress={() => {}}
                />
              </View>
              <View style={styles.dividerContainer}>
                <View style={styles.line} />
                <Text style={styles.dividerText}>
                  {TEXTS.SIGNUP.continueWith}
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
                <Text style={styles.footerText}>{TEXTS.SIGNUP.footerText}</Text>
                <Pressable onPress={() => router.push(ROUTES_PATH.auth.LOGIN)}>
                  <Text style={styles.signInText}>{TEXTS.SIGNUP.signIn}</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    marginTop: SPACING.lg,
  },
  keyboardContainer: {
    flex: 1,
  },
  signupConatiner: {
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
