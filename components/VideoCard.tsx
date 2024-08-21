import React, { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageStyle, TextStyle, ViewStyle } from "react-native";

import icons from "@/constants/icons";

interface VideoCardProps {
  title: string;
  creator: string;
  avatar: string;
  thumbnail: string;
  video: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, creator, avatar, thumbnail, video }) => {
  const [play, setPlay] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: avatar }}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>

          <View style={styles.textContainer}>
            <Text
              style={styles.title}
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              style={styles.creator}
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>

        <View style={styles.menuIconContainer}>
          <Image source={icons.menu} style={styles.menuIcon} resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded && status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          style={styles.thumbnailContainer}
        >
          <Image
            source={{ uri: thumbnail }}
            style={styles.thumbnail}
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            style={styles.playIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 56,
  } as ViewStyle,
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  } as ViewStyle,
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  } as ViewStyle,
  avatarContainer: {
    width: 46,
    height: 46,
    borderRadius: 8,
    borderColor: '#F1C40F', // secondary color
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0.5,
  } as ViewStyle,
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  } as ImageStyle,
  textContainer: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 12,
  } as ViewStyle,
  title: {
    fontFamily: 'Poppins-SemiBold', // font-psemibold
    fontSize: 14, // text-sm
    color: '#FFFFFF', // text-white
  } as TextStyle,
  creator: {
    fontFamily: 'Poppins-Regular', // font-pregular
    fontSize: 12, // text-xs
    color: '#CDCDE0', // text-gray-100
  } as TextStyle,
  menuIconContainer: {
    paddingTop: 8,
  } as ViewStyle,
  menuIcon: {
    width: 20, // w-5
    height: 20, // h-5
  } as ImageStyle,
  video: {
    width: '100%',
    height: 240, // h-60
    borderRadius: 16, // rounded-xl
    marginTop: 12, // mt-3
  } as ViewStyle,
  thumbnailContainer: {
    width: '100%',
    height: 240, // h-60
    borderRadius: 16, // rounded-xl
    marginTop: 12, // mt-3
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 16, // rounded-xl
  } as ImageStyle,
  playIcon: {
    width: 48, // w-12
    height: 48, // h-12
    position: 'absolute',
  } as ImageStyle,
});
