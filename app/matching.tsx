import { useTeamContext } from "@/src/context/TeamContext";
import matchMakingService from "@/src/service/MatchmakingService";
import { styles, THEME } from "@/src/styles/GlobalStyleSheet";
import { normalizeTeam } from "@/src/util/utils";
import { useRouter } from "expo-router";
import { Info, Trophy, Users } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const roleColors: Record<string, string> = {
  IGL: "#3b82f6",
  FRAGGER: "#ef4444",
  SUPPORT: "#10b981",
};

const TeamMatchingScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // const [teams, setTeams] = useState<ReturnType<typeof normalizeTeam>[]>([]);
  const { teams, setTeams } = useTeamContext();

  const findTeams = async () => {
    setLoading(true);
    try {
      const resp = await matchMakingService.findTeams(2);
      const normalizedTeams = resp.teams.map((team) =>
        normalizeTeam(team.members)
      );
      setTeams(normalizedTeams);
    } catch (error) {
      console.error("Matchmaking error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderPlayer = (member: any) => (
    <View
      key={member.id}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1f2937",
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
      }}
    >
      <View
        style={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: roleColors[member.preferredRole] || "#fff",
          marginRight: 8,
        }}
      />
      <Text style={{ color: THEME.text, flex: 1 }}>
        {member.preferredRole} - {member.stats?.currentTier?.tier || "-"} (
        {member.stats?.overallRating?.toFixed(1) || "-"})
      </Text>
      <Text style={{ color: THEME.textDim, fontSize: 12 }}>
        KD:{" "}
        {member.stats?.matches
          ? (member.stats.eliminations / member.stats.matches).toFixed(2)
          : "-"}{" "}
        • Win: {member.stats?.winRatePct?.toFixed(1) || "-"}%
      </Text>
    </View>
  );

  const renderTeam = (team: any, index: number) => {
    const avgElo =
      team.members.reduce(
        (sum: number, m: any) => sum + (m.eloRating || 0),
        0
      ) / (team.members.length || 1);
    const avgKDR =
      team.members.reduce(
        (sum: number, m: any) =>
          sum + (m.stats?.eliminations || 0) / (m.stats?.matches || 1),
        0
      ) / (team.members.length || 1);
    const avgWinRate =
      team.members.reduce(
        (sum: number, m: any) => sum + (m.stats?.winRatePct || 0),
        0
      ) / (team.members.length || 1);

    return (
      <View
        key={index}
        style={{
          flex: 1,
          backgroundColor: index === 0 ? "#111827" : "#1a1f2b",
          padding: 15,
          borderRadius: 12,
          marginVertical: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Text style={{ color: THEME.text, fontSize: 18, fontWeight: "700" }}>
            Team {index + 1}
          </Text>
          <Trophy size={20} color="#fbbf24" />
        </View>

        {team.members.map(renderPlayer)}

        {/* Stats pills row */}
        <View style={{marginTop:10, flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
          {[
            { label: "Avg Elo", value: avgElo.toFixed(0) },
            { label: "Avg K/D", value: avgKDR.toFixed(2) },
            { label: "Avg Win", value: avgWinRate.toFixed(1) + "%" },
          ].map((stat, i) => (
            <View key={i} style={styles.ratingPill}>
              <Text style={styles.pillText}>{stat.label}: {stat.value}</Text>
            </View>
          ))}
          <Info color={THEME.primary} size={18}/>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.bg }}>
      <View style={{ padding: 20, flex: 1 }}>
        <Text
          style={{
            color: THEME.text,
            fontSize: 28,
            fontWeight: "700",
            marginBottom: 5,
          }}
        >
          Team Matching
        </Text>
        <Text style={{ color: THEME.textDim, fontSize: 14 }}>
          Generate 2 balanced teams for your scrims
        </Text>

        {teams.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {loading ? (
              <>
                <ActivityIndicator size="large" color={THEME.primary} />
                <Text style={{ color: THEME.textDim, marginTop: 20 }}>
                  Building teams...
                </Text>
              </>
            ) : (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: THEME.primary,
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 10,
                }}
                onPress={findTeams}
              >
                <Users color="#000" size={20} />
                <Text
                  style={{ color: "#000", marginLeft: 8, fontWeight: "600" }}
                >
                  Build Teams
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <ScrollView style={{ marginTop: 20 }}>
            {teams.map(renderTeam)}
          </ScrollView>
        )}
        <TouchableOpacity
          style={{
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: THEME.primary,
            padding: 15,
            borderRadius: 10,
            marginTop: 20,
            alignItems: "center",
          }}
          onPress={() =>
            router.push({
              pathname: "/comparison",
              params: { teams: JSON.stringify(teams) },
            })
          }
        >
          <Text style={{ color: THEME.primary, fontWeight: "700" }}>
            Compare Stats
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TeamMatchingScreen;
