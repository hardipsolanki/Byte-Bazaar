import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { ROUTES_PATH } from "@/constants";

const index = () => {
  return (
    <SafeAreaView>
      <Link href={ROUTES_PATH.auth.SIGNUP}>SignUp</Link>
      <Link href={ROUTES_PATH.auth.LOGIN}>Login</Link>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
