import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert, StyleSheet } from "react-native";

import icons from "@/constants/icons";

interface SearchInputProps {
  initialQuery?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ initialQuery = " " }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} style={styles.searchIcon} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 64, // h-16
    paddingHorizontal: 16, // px-4
    backgroundColor: '#161622', // bg-black-100
    borderRadius: 16, // rounded-2xl
    borderWidth: 2, // border-2
    borderColor: '#1C1C28', // border-black-200
  },
  input: {
    fontSize: 16, // text-base
    marginTop: 2, // mt-0.5
    color: '#FFFFFF', // text-white
    flex: 1, // flex-1
    fontFamily: 'Poppins-Regular', // font-pregular
  },
  searchIcon: {
    width: 20, // w-5
    height: 20, // h-5
  },
});
