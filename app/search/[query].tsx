import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "@/lib/useAppwrite";
import { searchPosts } from "@/lib/appwrite";
import { EmptyState, SearchInput, VideoCard } from "@/components";

// Define types for Post and other necessary data
interface Post {
  $id: string;
  title: string;
  thumbnail: string;
  video: string;
  creator: {
    username: string;
    avatar: string;
  };
}

const Search = () => {
  const { query } = useLocalSearchParams<Record<string, string>>();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query || ''));
  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <Text style={styles.searchResultsText}>Search Results</Text>
            <Text style={styles.queryText}>{query}</Text>

            <View style={styles.searchInputContainer}>
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({  safeArea: {
    backgroundColor: "#000", // Replace with your primary color
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  searchResultsText: {
    fontSize: 14,
    color: "#d1d1d1",
    fontWeight: "500",
  },
  queryText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "600",
    marginTop: 4,
  },
  searchInputContainer: {
    marginTop: 24,
    marginBottom: 32,
  },
});

export default Search;
