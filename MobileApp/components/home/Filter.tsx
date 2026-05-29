import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SPACING } from "@/theme/spacing";
import { COLORS } from "@/theme/colors";
import { RADIUS } from "@/theme/radius";
import { FONT_SIZE, FONT_WEIGHT } from "@/theme/typography";
import { TEXTS } from "@/constants/plainText";

const CATEGORIES = [
  "Electronics",
  "Men",
  "Home Appliances",
  "Gaming",
  "Toys",
  "Books",
  "Food Nutritions",
  "Electronicss",
  "Mens",
  "Home Appliancess",
  "Gamings",
  "Toyss",
  "Bookss",
  "Food Nutrition",
];

const CategoryFilter = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("Men");

  const animation = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    if (open) {
      // CLOSE animation
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setOpen(false));
    } else {
      // OPEN animation
      setOpen(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  const selectItem = (item: string) => {
    setSelected(item);

    Animated.timing(animation, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start(() => setOpen(false));
  };

  const animatedStyle = {
    opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [-10, 0],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{TEXTS.Index.Filters}</Text>
      <Text style={styles.subtitle}>2 {TEXTS.Index.Products}</Text>
      <View style={styles.line} />
      <Text style={styles.label}>{TEXTS.Index.Category}</Text>

      <TouchableOpacity style={styles.dropdownHeader} onPress={toggleDropdown}>
        <Text>{selected}</Text>
        <AntDesign name={open ? "up" : "down"} size={16} />
      </TouchableOpacity>

      {open && (
        <Animated.View style={[styles.dropdownBox, animatedStyle]}>
          <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              const isSelected = item === selected;
              return (
                <TouchableOpacity
                  style={[styles.item, isSelected && styles.selectedItem]}
                  onPress={() => selectItem(item)}
                >
                  <Text>{item}</Text>
                   {isSelected && <AntDesign name="check" size={16} />}
                </TouchableOpacity>
              );
            }}
            showsVerticalScrollIndicator={false}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default CategoryFilter;
const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: SPACING.md,
    maxHeight: 250,
  },

  title: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
  },
  subtitle: {
    color: COLORS.gray500,
    marginTop: SPACING.xs,
  },

  line: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },

  label: {
    fontSize: FONT_SIZE.md,
    marginBottom: SPACING.sm,
  },

  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: COLORS.gray300,
    padding: 10,
    borderRadius: RADIUS.sm,
  },

  dropdownBox: {
    marginTop: SPACING.sm,
    backgroundColor: COLORS.white,
    maxHeight: 200,
    zIndex: 1,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: SPACING.sm,
  },

  selectedItem: {
    backgroundColor: COLORS.gray100,
  },
});
