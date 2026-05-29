import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Redirect } from "expo-router";
import { ROUTES_PATH } from "@/constants";
import Header from "@/components/home/Header";
import { COLORS } from "@/theme/colors";
import ImageSlider from "@/components/home/ImageSlider";
import CategoryFilter from "@/components/home/Filter";
import Products from "@/components/home/Products";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { currentUser } from "@/features/authSlice";
import { getHeroBanners } from "@/features/heroBannerSlice";
import { getCategories } from "@/features/categorySlice";
import { getProducts } from "@/features/productSlice";
import AppLoader from "@/components/AppLoader";
import { getUserCart } from "@/features/cartSlice";

const index = () => {
  const dispatch = useAppDispatch();
  const { appInitialized, isAuthenticated } = useAppSelector(
    (state) => state.users,
  );

  useEffect(() => {
    (dispatch(currentUser()),
      dispatch(getCategories()),
      dispatch(getHeroBanners()),
      dispatch(getProducts()));
      dispatch(getUserCart());
  }, [dispatch]);

  if (!appInitialized) return <AppLoader />;

  if (isAuthenticated) return <Redirect href={ROUTES_PATH.home} />;
  else return <Redirect href={ROUTES_PATH.auth.LOGIN} />;
};

export default index;
