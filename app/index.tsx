import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, StatusBar } from 'react-native';
import images from '@/constants/images';
import CustomButton from "../components/CustomButton";
import { useRouter } from 'expo-router';

const Index: React.FC = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            {/* <Loader isLoading={loading} /> */}

            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                }}
            >
                <View style={styles.image}>
                    <Image
                        source={images.logo}
                        style={{ width: 130, height: 84 }}
                        resizeMode="contain"
                    />

                    <Image
                        source={images.cards}
                        style={{ width: 380, height: 298 }}
                        resizeMode="contain"
                    />

                    <View style={{ position: "relative", marginTop: "5px" }}>
                        <Text style={{ fontSize: 30, fontWeight: "bold", color: "white", textAlign: "center" }}>
                            Discover Endless{"\n"}
                            Possibilities with{" "}
                            <Text style={{ color: "#FF8E01" }}>Aora</Text>
                        </Text>

                        <Image
                            source={images.path}
                            style={{ width: 136, height: 15, position: "absolute", bottom: -8, right: -30 }}
                            resizeMode="contain"
                        />
                    </View>

                    <Text style={{ fontSize: 20, color: "grey", marginTop: 12, textAlign: "center" }}>
                        Where Creativity Meets Innovation: Embark on a Journey of Limitless
                        Exploration with Aora
                    </Text>

                    <CustomButton
                        title="Continue with Email"
                        handlePress={() => router.push("/login")}
                        containerStyles={{ padding: 20, marginTop: 15, borderRadius: "20%" }} textStyles={undefined} isLoading={undefined} />
                </View>
            </ScrollView>

            <StatusBar backgroundColor="#161622" barStyle="light-content" />
        </SafeAreaView>
    );
}

export default Index;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#161622",
        flex: 1,
    },
    image: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: 0,
    },
});
