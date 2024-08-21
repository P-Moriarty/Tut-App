import { FC } from "react";
import { router } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";

import images from "@/constants/images";
import CustomButton from "./CustomButton";

interface EmptyStateProps {
  title: string;
  subtitle: string;
}

const EmptyState: FC<EmptyStateProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Image
        source={images.empty}
        resizeMode="contain"
        style={styles.image}
      />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <CustomButton
        title="Back to Explore"
        handlePress={() => router.push("/home")}
        containerStyles={styles.button} textStyles={undefined} isLoading={undefined} />
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  image: {
    width: 270,
    height: 216,
  },
  title: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#CDCDE0",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
    marginTop: 8,
    textAlign: "center",
  },
  button: {
    width: "100%",
    marginVertical: 20,
  },
});
