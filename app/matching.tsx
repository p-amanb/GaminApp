import matchMakingService from "@/src/service/MatchmakingService";
import { styles, THEME } from "@/src/styles/GlobalStyleSheet";
import { normalizeTeam } from "@/src/util/utils";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Trophy, Users } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TeamMatchingScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<ReturnType<typeof normalizeTeam>[]>(
    []
  );

  const findTeams = async () => {
    setLoading(true);

    try {
      const resp = await matchMakingService.findTeams(2);

      const normalizedTeams = resp.teams.map((team) =>
        normalizeTeam(team.members)
      );

      setMatches(normalizedTeams);
    } catch (error) {
      console.error("Matchmaking error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderTeamCard = ({ item }: any) => (
    <LinearGradient colors={[THEME.card, "#283548"]} style={styles.matchCard}>
      <View style={styles.rowBetween}>
        <View>
          <Text style={[styles.matchName]}>{item.name}</Text>
          <Text style={styles.matchSub}>
            Avg KD: {item.stats.kdr.toFixed(2)} • Win Rate:{" "}
            {(item.stats.victory / 2).toFixed(1)}%
          </Text>
        </View>
        <Trophy size={20} color="#fbbf24" />
      </View>
    </LinearGradient>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 20, flex: 1 }}>
        <Text style={styles.title}>Team Matching</Text>
        <Text style={styles.subtitle}>Find balanced opponents for scrims.</Text>

        {matches.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {loading ? (
              <>
                <ActivityIndicator size="large" color={THEME.primary} />
                <Text style={{ color: THEME.textDim, marginTop: 20 }}>
                  Scanning Region...
                </Text>
              </>
            ) : (
              <TouchableOpacity style={styles.ctaBtn} onPress={findTeams}>
                <Users color="#000" size={20} />
                <Text style={styles.ctaText}>Start Scanning</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <>
            <FlatList
              data={matches}
              keyExtractor={(item: any) => item.id}
              renderItem={renderTeamCard}
              contentContainerStyle={{ paddingTop: 20 }}
            />
            <View style={{ marginTop: 15 }}>
              <TouchableOpacity
                style={styles.outlineBtn}
                onPress={() =>
                  router.push({
                    pathname: "/comparison",
                    params: { teams: JSON.stringify(matches) },
                  })
                }
              >
                <Text style={styles.outlineBtnText}>Compare Stats</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default TeamMatchingScreen;
