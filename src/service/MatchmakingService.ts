import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../constants/constants";
import { getTokens } from "../util/token";

export interface Clan {
  name: string;
  role: string;
}

export interface Tier {
  mode: string;
  tier: string;
}

export interface Subratings {
  combat: number;
  survived: number;
  support: number;
  feedback: number;
  winRatio: number;
}

export interface Stats {
  id: string;
  bgmiUid: number;
  clan: Clan;
  playedForYears: number;
  matchesPlayed: number;
  achievementPoints: number;
  merit: number;
  seasonRating: number;
  seasonRankLabel: string;
  currentTier: Tier;
  matches: number;
  wins: number;
  top10: number;
  eliminations: number;
  fdRatio: number;
  winRatePct: number;
  top10RatePct: number;
  accuracyPct: number;
  headshots: number;
  headshotRatePct: number;
  totalDamage: number;
  avgDamage: number;
  mostElimsInMatch: number;
  highestDamageInMatch: number;
  totalAssists: number;
  avgAssists: number;
  longestTraveledKm: number;
  overallGrade: string;
  overallRating: number;
  subratings: Subratings;
}

export interface Member {
  id: string;
  eloRating: number;
  userId: string;
  preferredLanguage: string;
  preferredRegion: string;
  stats: Stats;
  preferredRole: string;
}

export interface Team {
  totalScore: number;
  avgElo: number;
  members: Member[];
  roles: string[];
  skillBalance: number;
  roleScore: number;
  behaviorScore: number;
  consistencyScore: number;
}

export interface MatchmakingResponse {
  teams: Team[];
  processingTimeMs: number;
  candidatesEvaluated: number;
  combinationsGenerated: number;
}


class MatchmakingService {
  async findTeams(
    topK: number = 2
  ): Promise<MatchmakingResponse> {
    const response: AxiosResponse<MatchmakingResponse> = await axios.get(
      `${BASE_URL}/matchmaking/find-teams`,
      {
        headers: {Authorization: `Bearer ${(await getTokens()).accessToken}`},
        params: { topK },
      }
    );
    return response.data;
  }

  async health(): Promise<{ status: string; service: string }> {
    const response: AxiosResponse<{ status: string; service: string }> =
      await axios.get(`${BASE_URL}/matchmaking/health`);
    return response.data;
  }
}

export default new MatchmakingService();
