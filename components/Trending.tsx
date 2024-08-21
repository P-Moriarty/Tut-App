import React, { useRef, useState } from "react";
import { ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  FlatListProps,
  View,
} from "react-native";

import icons from "@/constants/icons";

// Define the props interfaces
interface TrendingItemProps {
  activeItem: string;
  item: { $id: string; video: string; thumbnail: string };
}

interface TrendingProps {
  posts: { $id: string; video: string; thumbnail: string }[];
}

// Define animations
const zoomIn = Animatable.createAnimation(
  {
    0: {
      transform: [{ scale: 0.9 }],
    },
    1: {
      transform: [{ scale: 1 }],
    },
  }
) ;

const zoomOut = Animatable.createAnimation(
  {
    0: {
      transform: [{ scale: 1 }],
    },
    1: {
      transform: [{ scale: 0.9 }],
    },
  }
) ;

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  const animatableRef = useRef<Animatable.View & View>(null);
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      style={styles.trendingItemContainer}
      ref={animatableRef}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if ('didJustFinish' in status && status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          style={styles.thumbnailContainer}
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
          <Image source={icons.play} style={styles.playIcon} resizeMode="contain" />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0].$id);

  const viewableItemsChanged: FlatListProps<any>['onViewableItemsChanged'] = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
    />
  );
};

export default Trending;

const styles = StyleSheet.create({
  trendingItemContainer: {
    marginRight: 20, // mr-5
  } as ViewStyle,
  video: {
    width: 208, // w-52
    height: 288, // h-72
    borderRadius: 33, // rounded-[33px]
    marginTop: 12, // mt-3
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // bg-white/10
  } as ViewStyle,
  thumbnailContainer: {
    position: 'relative', // relative
    justifyContent: 'center', // flex justify-center
    alignItems: 'center', // items-center
  } as ViewStyle,
  thumbnail: {
    width: 208, // w-52
    height: 288, // h-72
    borderRadius: 33, // rounded-[33px]
    marginVertical: 20, // my-5
    overflow: 'hidden', // overflow-hidden
    shadowColor: '#000', // shadow-black/40
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  } as ImageStyle,
  playIcon: {
    width: 48, // w-12
    height: 48, // h-12
    position: 'absolute', // absolute
  } as ImageStyle,
});
