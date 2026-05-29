import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CheckoutState {
  addressId: string | null;
}

const initialState: CheckoutState = {
  addressId: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,

  reducers: {
    setAddressId: (state, action: PayloadAction<string>) => {
      state.addressId = action.payload;

      AsyncStorage.setItem(
        "checkout_addressId",
        action.payload,
      );
    },

    loadAddressId: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.addressId = action.payload;
    },

    clearCheckout: (state) => {
      state.addressId = null;

      AsyncStorage.removeItem("checkout_addressId");
    },
  },
});

export const {
  setAddressId,
  clearCheckout,
  loadAddressId,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;