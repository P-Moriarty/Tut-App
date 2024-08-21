import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface InfoBoxProps {
  title: string;
  subtitle: string;
  containerStyles?: ViewStyle;
  titleStyles?: TextStyle;
}

const InfoBox: React.FC<InfoBoxProps> = ({
  title,
  subtitle,
  containerStyles,
  titleStyles,
}) => {
  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={[styles.title, titleStyles]}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default InfoBox;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    textAlign: "center",
    fontFamily: "Poppins-SemiBold", // Assuming 'font-psemibold' corresponds to 'Poppins-SemiBold'
  },
  subtitle: {
    fontSize: 14, /* Assuming 'text-sm' corresponds to 14px */
    color: "#CDCDE0", /* Assuming 'text-gray-100' corresponds to this gray color */
    textAlign: "center",
    fontFamily: "Poppins-Regular", // Assuming 'font-pregular' corresponds to 'Poppins-Regular'
  },
});
