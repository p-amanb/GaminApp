import RadarChart from "@/src/component/RadarChart";
import { styles, THEME } from "@/src/styles/GlobalStyleSheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Send } from "lucide-react-native";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const TeamComparisonScreen = () => {
  const router = useRouter();
  const { teams } = useLocalSearchParams();
  const parsedTeams = JSON.parse(teams as string);

  // assign teams
  const myTeam = parsedTeams[0];
  const opponent = parsedTeams[1];

  const teamA = "#ef4444";
  const teamB = "#8b5cf6";

  // Reusable Bar for Linear Stats
  const ComparisonBar = ({ label, valA, valB, suffix = "" }: any) => {
    const leftWidth = Math.min(100, valB);
    const rightWidth = Math.min(100, valA);

    return (
      <View style={{ marginBottom: 20 }}>
        {/* Top Row: B value (left), Label (center), A value (right) */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <Text style={{ color: teamA, fontWeight: "bold" }}>
            {valB.toFixed(1)}
            {suffix}
          </Text>

          <Text style={{ color: THEME.textDim, fontSize: 12 }}>{label}</Text>

          <Text style={{ color: teamB, fontWeight: "bold" }}>
            {valA.toFixed(1)}
            {suffix}
          </Text>
        </View>

        {/* Center Split Bar */}
        <View
          style={{
            height: 8,
            backgroundColor: "#334155",
            borderRadius: 4,
            overflow: "hidden",
            flexDirection: "row",
          }}
        >
          {/* LEFT side (B team) */}
          <View
            style={{
              width: `${leftWidth}%`,
              backgroundColor: teamB,
              opacity: 0.6,
            }}
          />

          {/* CENTER divider */}
          <View style={{ width: 2, backgroundColor: "#1e293b" }} />

          {/* RIGHT side (A team) */}
          <View
            style={{
              width: `${rightWidth}%`,
              backgroundColor: teamA,
              opacity: 0.8,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color={THEME.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.header}>Squad Analysis</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Head to Head Header */}
        <View style={styles.vsContainer}>
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={[styles.vsTeamName, { color: myTeam.color }]}>
              {myTeam.name}
            </Text>
            <Text style={styles.vsLabel}>Team A</Text>
          </View>
          <Text style={styles.vsText}>VS</Text>
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={[styles.vsTeamName, { color: opponent.color }]}>
              {opponent.name}
            </Text>
            <Text style={styles.vsLabel}>Team B</Text>
          </View>
        </View>

        {/* Radar Chart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Attribute Web</Text>
          <RadarChart
            dataA={myTeam.stats}
            dataB={opponent.stats}
            colorA={teamA}
            colorB={teamB}
          />
        </View>

        {/* Detailed Stats */}
        <View style={[styles.card, { marginTop: 20 }]}>
          <Text style={styles.cardTitle}>Performance Metrics</Text>
          <View style={styles.divider} />

          <ComparisonBar
            label="Team K/D Ratio"
            valA={myTeam.stats.kdr}
            valB={opponent.stats.kdr}
          />
          <ComparisonBar
            label="Combat Rating"
            valA={myTeam.stats.combat}
            valB={opponent.stats.combat}
          />
          <ComparisonBar
            label="Survival Rating"
            valA={myTeam.stats.survival}
            valB={opponent.stats.survival}
          />
          <ComparisonBar
            label="Support Efficiency"
            valA={myTeam.stats.support}
            valB={opponent.stats.support}
          />
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.inviteBtn}
          onPress={() =>
            Alert.alert("Invite Sent", `Request sent to ${opponent.name}`)
          }
        >
          <Send color="#000" size={20} style={{ marginRight: 8 }} />
          <Text style={styles.inviteText}>Send Invite</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TeamComparisonScreen;
