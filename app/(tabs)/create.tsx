import React, { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

import icons from "@/constants/icons";
import { createVideoPost } from "@/lib/appwrite";
import { CustomButton, FormField } from "@/components";
import { useGlobalContext } from "@/context/GlobalProvider";

// Define types for the form state
interface FormState {
  title: string;
  video: DocumentPicker.DocumentPickerResult | null;
  thumbnail: DocumentPicker.DocumentPickerResult | null;
  prompt: string;
}

const create: React.FC = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType: "image" | "video") => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result,
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result,
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if (!form.prompt || !form.title || !form.thumbnail || !form.video || !user) {
      return Alert.alert("Please provide all fields and ensure user is logged in");
    }

    setUploading(true);
    try {
      const thumbnailFile = form.thumbnail.assets?.[0] ? new File([await fetchBlob(form.thumbnail.assets[0].uri)], form.thumbnail.assets[0].name, { type: form.thumbnail.assets[0].mimeType }) : null;
      const videoFile = form.video.assets?.[0] ? new File([await fetchBlob(form.video.assets[0].uri)], form.video.assets[0].name, { type: form.video.assets[0].mimeType }) : null;

      if (!thumbnailFile || !videoFile) {
        throw new Error("Invalid thumbnail or video file");
      }

      await createVideoPost({
        title: form.title,
        prompt: form.prompt,
        thumbnail: thumbnailFile,
        video: videoFile,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  };

  const fetchBlob = async (uri: string): Promise<Blob> => {
    const response = await fetch(uri);
    return await response.blob();
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Upload Video</Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e: string) => setForm({ ...form, title: e })}
          otherStyles={styles.formFieldMargin}
        />

        <View style={styles.uploadSection}>
          <Text style={styles.uploadSectionTitle}>Upload Video</Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video && form.video.assets && form.video.assets[0] ? (
              <Video
                source={{ uri: form.video.assets[0].uri }}
                style={styles.video}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View style={styles.uploadContainer}>
                <View style={styles.uploadIconContainer}>
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    style={styles.uploadIcon}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.uploadSection}>
          <Text style={styles.uploadSectionTitle}>Thumbnail Image</Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail && form.thumbnail.assets && form.thumbnail.assets[0] ? (
              <Image
                source={{ uri: form.thumbnail.assets[0].uri }}
                resizeMode="cover"
                style={styles.thumbnail}
              />
            ) : (
              <View style={styles.thumbnailContainer}>
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  style={styles.thumbnailUploadIcon}
                />
                <Text style={styles.thumbnailUploadText}>
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video...."
          handleChangeText={(e: string) => setForm({ ...form, prompt: e })}
          otherStyles={styles.formFieldMargin}
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles={styles.submitButtonContainer}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#161622", 
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 5
  },
  formFieldMargin: {
    marginTop: 40,
  },
  uploadSection: {
    marginTop: 28,
  },
  uploadSectionTitle: {
    fontSize: 16,
    color: "#d1d1d1",
    fontWeight: "500",
  },
  video: {
    width: "100%",
    height: 256,
    borderRadius: 16,
  },
  uploadContainer: {
    width: "100%",
    height: 160,
    paddingHorizontal: 16,
    backgroundColor: "#101010",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#202020",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadIconContainer: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#6b7280",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadIcon: {
    width: "50%",
    height: "50%",
  },
  thumbnail: {
    width: "100%",
    height: 256,
    borderRadius: 16,
  },
  thumbnailContainer: {
    width: "100%",
    height: 64,
    paddingHorizontal: 16,
    backgroundColor: "#101010",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#202020",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  thumbnailUploadIcon: {
    width: 20,
    height: 20,
  },
  thumbnailUploadText: {
    fontSize: 14,
    color: "#d1d1d1",
    fontWeight: "500",
  },
  submitButtonContainer: {
    marginTop: 28,
  },
});

export default create;
