import Button from "@/src/component/Button";
import StatCard from "@/src/component/StatCard";
import { AuthContext } from "@/src/context/AuthContext"; // adjust path
import userService from "@/src/service/UserService";
import { styles, THEME } from "@/src/styles/GlobalStyleSheet";
import { removeTokens } from "@/src/util/token";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Crosshair, Shield, Target, Zap } from "lucide-react-native";
import React, { useContext, useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen: React.FC = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  if (!authContext) {
    return <ActivityIndicator size="large" color={THEME.primary} />;
  }

  const { userData, setUserData } = authContext;

  // Fetch user data on mount
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const data = await userService.getUserWithPlayer();
        if (mounted) setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  if (!userData) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={THEME.primary} />
      </SafeAreaView>
    );
  }

  const { player, season_meta } = userData;
  const stats = player?.stats || {};
  const meta = season_meta || {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>Welcome back,</Text>
            <Text style={styles.playerName}>{stats.clan?.name || "Player"}</Text>
          </View>
          <View style={styles.rankBadge}>
            <Text style={styles.rankText}>{stats.currentTier?.tier || "-"}</Text>
          </View>
        </View>

        {/* Main Stats Card */}
        <LinearGradient colors={[THEME.card, "#1a2e35"]} style={styles.heroCard}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.heroLabel}>F/D Ratio</Text>
              <Text style={styles.heroValue}>{stats.fdRatio || 0}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.heroLabel}>Grade</Text>
              <Text style={[styles.heroValue, { color: THEME.primary }]}>
                {stats.overallGrade || "-"}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.rowBetween}>
            <Text style={styles.subStat}>Wins: {stats.wins || 0}</Text>
            <Text style={styles.subStat}>Top 10: {stats.top10 || 0}</Text>
            <Text style={styles.subStat}>Matches: {stats.matches || 0}</Text>
          </View>
        </LinearGradient>

        {/* Performance Stats */}
        <Text style={styles.sectionTitle}>Performance</Text>
        <View style={styles.grid}>
          <StatCard
            label="Eliminations"
            value={stats.eliminations || 0}
            icon={Crosshair}
            subValue={`Most: ${stats.mostElimsInMatch || 0}`}
          />
          <StatCard
            label="Avg Damage"
            value={Math.floor(stats.avgDamage || 0)}
            icon={Zap}
            subValue={`Total: ${((stats.totalDamage || 0) / 1000).toFixed(1)}k`}
          />
          <StatCard
            label="Headshots"
            value={`${stats.headshotRatePct || 0}%`}
            icon={Target}
            subValue={`${stats.headshots || 0} hits`}
          />
          <StatCard
            label="Survival"
            value={stats.subratings?.survived || 0}
            icon={Shield}
          />
        </View>

        {/* Sub-Ratings */}
        <Text style={styles.sectionTitle}>Sub-Ratings</Text>
        <View style={styles.ratingsRow}>
          <View style={styles.ratingPill}>
            <Text style={styles.pillText}>
              Combat {stats.subratings?.combat || 0}
            </Text>
          </View>
          <View style={styles.ratingPill}>
            <Text style={styles.pillText}>
              Support {stats.subratings?.support || 0}
            </Text>
          </View>
          <View style={styles.ratingPill}>
            <Text style={styles.pillText}>
              Win Ratio {stats.subratings?.winRatio || 0}
            </Text>
          </View>
        </View>

        {/* Button */}
        <View style={{ marginTop: 30, paddingHorizontal: 20,display:"flex",gap:10 }}>
          <Button title="Team Matching" onPress={() => router.navigate("/matching")} />
          <Button title="Logout" onPress={() => {
            removeTokens()
            router.replace("/login")
            }} />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
