
import React from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";

import icons  from "@/constants/icons";
import useAppwrite from "@/lib/useAppwrite";
import { getUserPosts, signOut } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { EmptyState, InfoBox, VideoCard } from "@/components";

// Define the Post and User types based on your data structure
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

interface ProfileProps {}

const explore: React.FC<ProfileProps> = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    router.replace("/login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={posts}
        keyExtractor={(item: Post) => item.$id}
        renderItem={({ item }: { item: Post }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator?.username ?? ''}
            avatar={item.creator?.avatar ?? ''}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
              <Image source={icons.logout} resizeMode="contain" style={styles.logoutIcon} />
            </TouchableOpacity>

            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: user?.avatar }}
                style={styles.avatar}
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username ?? ""}
              containerStyles={styles.infoBoxContainer}
              titleStyles={styles.infoBoxTitle}
              subtitle={""}
            />

            <View style={styles.infoStats}>
              <InfoBox
                title={String(posts?.length ?? 0)}
                subtitle="Posts"
                titleStyles={styles.infoStatsTitle}
                containerStyles={styles.infoStatsContainer}
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles={styles.infoStatsTitle}
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({  safeArea: {
    backgroundColor: "#161622", // Replace with your primary color
    flex: 1,
  },
  headerContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 48,
    paddingHorizontal: 16,
  },
  logoutButton: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 40,
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderWidth: 1,
    borderColor: "#000", // Replace with your secondary color
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: "90%",
    height: "90%",
    borderRadius: 8,
  },
  infoBoxContainer: {
    marginTop: 20,
  },
  infoBoxTitle: {
    fontSize: 18,
  },
  infoStats: {
    marginTop: 20,
    flexDirection: "row",
  },
  infoStatsTitle: {
    fontSize: 24,
  },
  infoStatsContainer: {
    marginRight: 40,
  },
});

export default explore;