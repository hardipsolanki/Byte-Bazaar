import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";
import { FONT_SIZE, FONT_WEIGHT } from "@/theme/typography";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addAddress, updateAddress } from "@/features/addressSlice";
import { SafeAreaView } from "react-native-safe-area-context";

type Inputs = {
  addressLine: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  isPrimary: boolean;
};

interface AddAddressBottomSheetProps {
  title: string;
  onClose: () => void;
  updateAddressId?: string;
}

const AddAddressBottomSheet = ({
  onClose,
  updateAddressId,
  title,
}: AddAddressBottomSheetProps) => {
  const dispatch = useAppDispatch();
  const { addresses, loading } = useAppSelector(({ addresses }) => addresses);
  const defaultValues = addresses?.find((add) => add._id === updateAddressId);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      addressLine: defaultValues?.addressLine || "",
      country: defaultValues?.country || "",
      state: defaultValues?.state || "",
      city: defaultValues?.city || "",
      pincode: defaultValues?.pincode || "",
      isPrimary: defaultValues?.isPrimary || false,
    },
  });

  const isPrimary = watch("isPrimary");

  const onSubmit = (data: Inputs) => {
    if (updateAddressId) {
      dispatch(updateAddress({ addressId: updateAddressId, data }))
        .unwrap()
        .then((data) => {
          if (data.success) {
            Toast.show({
              type: "success",
              text1: data.message,
            });
            onClose();
          }
        });
    } else {
      dispatch(addAddress(data))
        .unwrap()
        .then((data) => {
          if (data.success) {
            Toast.show({
              type: "success",
              text1: data.message,
            });
            onClose();
            return;
          }
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>

        <Pressable onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close-circle" size={30} color={COLORS.gray400} />
        </Pressable>
      </View>

      <View style={styles.divider} />

      {/* CONTENT */}
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.inputsContainer}>
          {/* ADDRESS LINE */}
          <Controller
            control={control}
            name="addressLine"
            rules={{ required: "Address line is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Address Line"
                placeholder="Enter address"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.addressLine?.message}
              />
            )}
          />

          {/* COUNTRY */}
          <Controller
            control={control}
            name="country"
            rules={{ required: "Country is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Country"
                placeholder="Enter country"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.country?.message}
              />
            )}
          />

          {/* STATE */}
          <Controller
            control={control}
            name="state"
            rules={{ required: "State is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="State"
                placeholder="Enter state"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.state?.message}
              />
            )}
          />

          {/* CITY */}
          <Controller
            control={control}
            name="city"
            rules={{ required: "City is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="City"
                placeholder="Enter city"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.city?.message}
              />
            )}
          />

          {/* PINCODE */}
          <Controller
            control={control}
            name="pincode"
            rules={{ required: "Pincode is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Pincode"
                placeholder="Enter pincode"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.pincode?.message}
              />
            )}
          />

          {/* PRIMARY CHECKBOX */}
          <Pressable
            style={styles.checkboxContainer}
            onPress={() => setValue("isPrimary", !isPrimary)}
          >
            <View
              style={[styles.checkbox, isPrimary && styles.checkboxSelected]}
            >
              {isPrimary && (
                <Ionicons name="checkmark" size={14} color={COLORS.white} />
              )}
            </View>

            <Text style={styles.checkboxText}>Set as Primary</Text>
          </Pressable>
        </View>
      </BottomSheetScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Button
          title="Update Address"
          onPress={handleSubmit(onSubmit)}
          loading={loading === "pending"}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddAddressBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  header: {
    paddingHorizontal: SPACING.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
  },

  closeButton: {
    position: "absolute",
    right: SPACING.lg,
    top: SPACING.xs,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginTop: SPACING.md,
  },

  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING["5xl"],
    flexGrow: 1,
  },

  inputsContainer: {
    gap: SPACING.lg,
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.sm,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },

  checkboxSelected: {
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
  },

  checkboxText: {
    marginLeft: SPACING.sm,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.black,
  },

  footer: {
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
});
