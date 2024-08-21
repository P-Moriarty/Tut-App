import React from "react";
import { View, ActivityIndicator, Dimensions, Platform, StyleSheet } from "react-native";

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  const osName = Platform.OS;
  const screenHeight = Dimensions.get("screen").height;

  if (!isLoading) return null;

  return (
    <View
      style={[
        styles.container,
        {
          height: screenHeight,
        },
      ]}
    >
      <ActivityIndicator
        animating={isLoading}
        color="#fff"
        size={osName === "ios" ? "large" : 50}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 122, 255, 0.6)", // bg-primary/60
    zIndex: 10,
  },
});
