import Button from "@/src/component/Button";
import { AuthContext } from "@/src/context/AuthContext";
import { styles, THEME } from "@/src/styles/GlobalStyleSheet";
import React, { useContext, useState } from "react";
import { Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Define type for navigation prop if using React Navigation

const OTPScreen: React.FC = ( ) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within AuthProvider");
  }

  const { verifyOtp } = authContext;
  const [otp, setOtp] = useState<string>("");

  const handleVerify = () => {
      verifyOtp(otp);
      // Navigation will be handled by Root Navigator based on Auth State
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Verification</Text>
      <Text style={styles.subtitle}>Enter the 4-digit code sent to you.</Text>

      <TextInput
        style={[
          styles.input,
          { textAlign: "center", letterSpacing: 10, fontSize: 24, marginVertical: 40 },
        ]}
        placeholder="- - - -"
        placeholderTextColor={THEME.textDim}
        keyboardType="number-pad"
        maxLength={4}
        value={otp}
        onChangeText={setOtp}
      />

      <Button title="Verify & Login" onPress={handleVerify} />
    </SafeAreaView>
  );
};

export default OTPScreen;