// // import Ionicons from '@expo/vector-icons/Ionicons';
// import { StyleSheet, Image, View, Text, RefreshControl } from 'react-native';
// import { FlatList, SafeAreaView } from '@gluestack-ui/themed';
// import images from '@/constants/images';
// import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";
// import { useState } from 'react';


// export default function TabTwoScreen() {

//   const [refreshing, setRefreshing] = useState(false);

//   // const fetchData = async () => {
//   //   // Simulate a network request with a delay
//   //   return new Promise((resolve, reject) => {
//   //     setTimeout(() => {
//   //       // Simulate success or failure
//   //       const success = true; // Change to false to simulate a failure
//   //       if (success) {
//   //         resolve("Data fetched successfully");
//   //       } else {
//   //         reject("Error fetching data");
//   //       }
//   //     }, 2000); // 2-second delay
//   //   });
//   // };

//   // const onRefresh = async () => {
//   //   try {
//   //     setRefreshing(true);
//   //     const data = await fetchData();
//   //     console.log(data);
//   //   } catch (error) {
//   //     console.error("Error during fetch:", error);
//   //   } finally {
//   //     setRefreshing(false);
//   //   }
//   // };

//   return (
//     <SafeAreaView>
//       <FlatList
//         ListHeaderComponent={() => (
//           <View>
//             <View>
//               <View>
//                 <Text>
//                   Welcome Back
//                 </Text>
//                 <Text>
//                   Manuel
//                 </Text>
//               </View>
//               <View>
//                 <Image
//                   source={images.logoSmall}
//                   resizeMode='contain'
//                 />
//               </View>
//             </View>

//             <SearchInput initialQuery={undefined} />

//             <View>
//               <Text>
//                 Latest Videos
//               </Text>

//               <Trending posts={undefined} />
//             </View>
//           </View>
//         )}
//         ListEmptyComponent={() => (
//           <EmptyState title="Novideos Found" subtitle="No Videos Created yet" />
//         )}
//       // refreshControl={
//       //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//       // }
//       />

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   headerImage: {

//   }
// });

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const explore = () => {
  return (
    <View style={styles.container}>
      <Text>explore</Text>
    </View>
  )
}

export default explore

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
    padding: 16,
    justifyContent: 'center',
  }
})