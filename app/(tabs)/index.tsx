import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from '@gluestack-ui/themed';
import { SearchInput, Trending } from '@/components/index';
import images from '@/constants/images';


const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.nameText}>Manuel</Text>
          </View>

          <View style={styles.logoContainer}>
            <Image
              source={images.logoSmall}
              style={styles.logo}
              resizeMode='contain'
            />
          </View>

        </View>

        <SearchInput initialQuery={undefined} />

        <View style={styles.content}>
          <Text style={styles.latestVideosText}>
            Latest Videos
          </Text>

          {/* <Trending posts={[]} /> */}
        </View>

      </View>
    </SafeAreaView>

  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24, // mb-6
  },
  welcomeText: {
    fontFamily: 'Poppins-Medium', // assuming font-pmedium refers to Poppins-Medium
    fontSize: 14, // text-sm
    color: '#D1D5DB', // text-gray-100
  },
  nameText: {
    fontSize: 24, // text-2xl
    fontFamily: 'Poppins-SemiBold', // assuming font-psemibold refers to Poppins-SemiBold
    color: '#FFFFFF', // text-white
  },
  logoContainer: {
    marginTop: 6, // mt-1.5
  },
  logo: {
    width: 36, // w-9
    height: 40, // h-10
  },
  content: {
    width: '100%',
    flex: 1,
    paddingTop: 20, // pt-5
    paddingBottom: 32, // pb-8
  },
  latestVideosText: {
    fontSize: 18, // text-lg
    fontFamily: 'Poppins-Regular', // assuming font-pregular refers to Poppins-Regular
    color: '#D1D5DB', // text-gray-100
    marginBottom: 12, // mb-3
  },
})