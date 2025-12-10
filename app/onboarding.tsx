import Button from "@/src/component/Button";
import { AuthContext } from "@/src/context/AuthContext";
import { styles, THEME } from "@/src/styles/GlobalStyleSheet";
import * as ImagePicker from "expo-image-picker"; // Make sure expo-image-picker is installed
import { router } from "expo-router";
import { Target, User } from "lucide-react-native";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";
import userService from "../src/service/UserService";

const OnboardingScreen: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within AuthProvider");
  }

  const { completeOnboarding } = authContext;

  // Type image state as string | null
  const [img1, setImg1] = useState<string | null>(null);
  const [img2, setImg2] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Image picker helper
  const pickImage = async (
    setter: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setter(result.assets[0].uri);
    }
  };

  const handleAnalyze = async () => {
    if (!img1 || !img2) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Select images",
        position: "bottom",
        visibilityTime: 4000,
        autoHide: true,
      });
      return;
    }
    setLoading(true);
    try {
      const resp = await userService.uploadScreenshots(img1, img2);
      completeOnboarding(resp);
      console.log(resp)
      router.replace("/home")
    } catch (error: any) {
      console.log(error.response.data)
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response.data.message || error.message,
        position: "bottom",
        visibilityTime: 4000,
        autoHide: true,
      });
    }finally{
      setLoading(false)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>Profile Setup</Text>
        <Text style={styles.subtitle}>
          Upload your screenshots to sync stats.
        </Text>

        {/* Upload Area 1 */}
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => pickImage(setImg1)}
        >
          {img1 ? (
            <Image source={{ uri: img1 }} style={styles.uploadedImg} />
          ) : (
            <>
              <User size={32} color={THEME.primary} />
              <Text style={styles.uploadText}>Upload Basic Info Profile</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Upload Area 2 */}
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => pickImage(setImg2)}
        >
          {img2 ? (
            <Image source={{ uri: img2 }} style={styles.uploadedImg} />
          ) : (
            <>
              <Target size={32} color={THEME.accent} />
              <Text style={styles.uploadText}>Upload Stats Screen</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={{ marginTop: 20 }}>
          {loading ? (
            <ActivityIndicator size="large" color={THEME.primary} />
          ) : (
            <Button title="Analyze & Sync" onPress={handleAnalyze} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
