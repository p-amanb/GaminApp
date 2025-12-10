import Button from "@/src/component/Button";
import { styles, THEME } from "@/src/styles/GlobalStyleSheet";
import { Users } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  View
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const TeamMatchingScreen: React.FC = () => {
  const [searching, setSearching] = useState<boolean>(false);

  const startMatch = () => {
    setSearching(true);

    setTimeout(() => {
      setSearching(false);
      Alert.alert(
        "Match Found!",
        "Squad Delta is looking for a player like you."
      );
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 20 }}>
        <Text style={styles.title}>Find Squad</Text>
        <Text style={styles.subtitle}>
          Filter parameters to find the perfect teammates.
        </Text>

        {/* Form Section */}
        <View style={styles.form}>
          <Text style={styles.label}>Preferred Region</Text>
          <View style={styles.input}>
            <Text style={styles.inputText}>Asia / India</Text>
          </View>

          <Text style={styles.label}>Language</Text>
          <View style={styles.input}>
            <Text style={styles.inputText}>English / Hindi</Text>
          </View>
        </View>

        {/* Matchmaking Button / Loader */}
        <View style={{ marginTop: 40 }}>
          {searching ? (
            <View style={{ alignItems: "center" }}>
              <ActivityIndicator size="large" color={THEME.primary} />
              <Text style={{ color: THEME.text, marginTop: 10 }}>
                Scanning for teammates...
              </Text>
            </View>
          ) : (
            <Button title="Start Matching" onPress={startMatch} icon={Users} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TeamMatchingScreen;