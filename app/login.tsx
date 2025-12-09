import Button from "@/src/component/Button";
import { AuthContext } from "@/src/context/AuthContext";
import { useRouter } from "expo-router";
import { ChevronDown, Gamepad2 } from "lucide-react-native";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, THEME } from "../src/styles/GlobalStyleSheet";

const LoginScreen: React.FC = () => {
  const authContext = useContext(AuthContext)!;
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const codes = ["+91", "+1", "+44", "+81"]; // Simple mock

  const handleLogin = async () => {
    const cleanedPhone = phone.replace(/\D/g, "");
    setLoading(true);
    if (cleanedPhone.length === 10) {
      await authContext.login(`${countryCode}${cleanedPhone}`);
    } else {
      Alert.alert("Error", "Enter a valid 10-digit phone number");
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Gamepad2 size={64} color={THEME.primary} />
        <Text style={styles.title}>GAMIN</Text>
        <Text style={styles.subtitle}>Enter the Arena</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.inputGroup}>
          <TouchableOpacity
            style={styles.countryPicker}
            onPress={() => setShowPicker(!showPicker)}
          >
            <Text style={styles.inputText}>{countryCode}</Text>
            <ChevronDown size={16} color={THEME.textDim} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="9876543210"
            placeholderTextColor={THEME.textDim}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
        {showPicker && (
          <View style={styles.dropdown}>
            {codes.map((c) => (
              <TouchableOpacity
                key={c}
                onPress={() => {
                  setCountryCode(c);
                  setShowPicker(false);
                }}
                style={styles.dropdownItem}
              >
                <Text style={styles.inputText}>{c}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={{ marginTop: 20 }}>
          {loading ? (
            <ActivityIndicator size="large" color={THEME.primary} />
          ) : (
            <Button title="Send OTP" onPress={handleLogin} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
