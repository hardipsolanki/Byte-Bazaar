import {
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import { imagePicker } from "@/utils/imagePicker";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UserRegisterRequest } from "@/types/auth";
import { registerUser } from "@/features/authSlice";
import Toast from "react-native-toast-message";

type Inputs = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  avatar: {
    uri: string;
    type: string;
    name: string;
  };
};
const signup = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.users);

  const [avatar, setAvatar] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({});

  const handleImagePick = async () => {
    await imagePicker().then((avatarData) => {
      if (avatarData) {
        setAvatar(avatarData.uri);
        setValue("avatar", avatarData);
      }
    });
  };

  const onSubmit = (data: Inputs) => {
    dispatch(registerUser(data))
      .unwrap()
      .then((data) => {
        Toast.show({
          type: "success",
          text1: data.message,
        });
        router.push(ROUTES_PATH.home);
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: error.message,
        });
      });
  };

   const handleAuthGoogle = async () => {
      await Linking.openURL(process.env.EXPO_PUBLIC_GOOGLE_REDIRECT_URL as any)
    };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.black} />

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
                {/* AVATAR */}
                <TouchableOpacity
                  style={styles.avatarContainer}
                  activeOpacity={0.8}
                  onPress={handleImagePick}
                >
                  {avatar ? (
                    <Image
                      source={{ uri: avatar }}
                      style={styles.avatarImage}
                    />
                  ) : (
                    <View style={styles.avatarPlaceholder}>
                      <Ionicons name="camera-outline" size={28} color="#666" />

                      <Text style={styles.avatarText}>Upload Photo</Text>
                    </View>
                  )}
                </TouchableOpacity>

                {/* FULL NAME */}
                <Controller
                  control={control}
                  name="fullName"
                  rules={{
                    required: TEXTS.SIGNUP.errors.fullNameRequired,
                    minLength: {
                      value: 3,
                      message: TEXTS.SIGNUP.errors.fullNameMinLength,
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Input
                        placeholder={TEXTS.SIGNUP.fullNamePlaceholder}
                        label={TEXTS.SIGNUP.fullNameLabel}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.fullName?.message}
                      />
                    </>
                  )}
                />

                {/* EMAIL */}
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: TEXTS.SIGNUP.errors.emailRequired,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: TEXTS.SIGNUP.errors.invalidEmail,
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Input
                        placeholder={TEXTS.SIGNUP.emailPlaceholder}
                        label={TEXTS.SIGNUP.emailLabel}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.email?.message}
                      />
                    </>
                  )}
                />

                {/* PHONE NUMBER */}
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

                  <Controller
                    control={control}
                    name="phoneNumber"
                    rules={{
                      required: TEXTS.SIGNUP.errors.phoneRequired,
                      minLength: {
                        value: 10,
                        message: TEXTS.SIGNUP.errors.invalidPhone,
                      },
                      maxLength: {
                        value: 10,
                        message: TEXTS.SIGNUP.errors.invalidPhone,
                      },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <View style={{ flex: 1 }}>
                        <Input
                          placeholder={TEXTS.SIGNUP.phoneNumberPlaceholder}
                          label={TEXTS.SIGNUP.phoneNumberLabel}
                          keyboardType="numeric"
                          containerStyle={{ flex: 1 }}
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          error={errors.phoneNumber?.message}
                        />
                      </View>
                    )}
                  />
                </View>

                {/* PASSWORD */}
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: TEXTS.SIGNUP.errors.passwordRequired,
                    minLength: {
                      value: 6,
                      message: TEXTS.SIGNUP.errors.passwordMinLength,
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder={TEXTS.SIGNUP.passwordPlaceholder}
                      label={TEXTS.SIGNUP.passwordLabel}
                      secureTextEntry
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={errors.password?.message}
                    />
                  )}
                />

                <Button
                  title={TEXTS.SIGNUP.buttonTitle}
                  variant="primary"
                  fullWidth
                  loading={loading === "pending"}
                  onPress={handleSubmit(onSubmit)}
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
                <SocialButton title="Google" onPress={handleAuthGoogle}>
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

  avatarContainer: {
    alignSelf: "center",
  },

  avatarImage: {
    width: 110,
    height: 110,
    borderRadius: RADIUS.full,
  },

  avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    gap: 6,
  },

  avatarText: {
    fontSize: 12,
    color: COLORS.gray500,
  },

  errorText: {
    color: COLORS.error,
    fontSize: FONT_SIZE.xs,
    marginTop: -10,
  },
});
