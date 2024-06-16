import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[styles.container, containerStyles, isLoading ? "opacity-50" : ""]}
      disabled={isLoading}
    >
      <Text style={[styles.title, textStyles]}>{title}</Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: "row",
    backgroundColor: "#FF9C01",
    borderCurve: "circular",
    minHeight: "62px",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#161622",
    fontWeight: "semibold",
    fontSize: "large",
  },
});

export default CustomButton;
