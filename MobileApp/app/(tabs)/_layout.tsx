import React from "react";
import { Tabs } from "expo-router";
import {
  Feather,
  Ionicons,
} from "@expo/vector-icons";
import { COLORS } from "@/theme/colors";
import { ROUTES } from "@/constants";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: COLORS.logo,
        tabBarInactiveTintColor: COLORS.black,
        tabBarStyle: {
          backgroundColor: COLORS.white,
        },
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name={ROUTES.home}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />

      {/* Orders */}
      <Tabs.Screen
        name={ROUTES.order}
        options={{
          title: "Orders",

          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-bag" size={size} color={color} />
          ),
        }}
      />

      {/* About */}
      <Tabs.Screen
        name={ROUTES.about}
        options={{
          title: "About",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Profile */}
      <Tabs.Screen
        name={ROUTES.profile}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
