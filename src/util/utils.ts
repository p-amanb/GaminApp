import { Member } from "../service/MatchmakingService";
import { THEME } from "../styles/GlobalStyleSheet";

const uriToFile = (uri: string, fileName: string) => {
  // Try to extract extension
  const ext = uri.split(".").pop();
  const mimeType = ext ? `image/${ext}` : "image/jpeg";

  return {
    uri,
    type: mimeType,
    name: fileName,
  };
};

const normalizeTeam = (members: Member[]) => {
  const count = members.length || 1; // prevents divide-by-zero

  // helper to calculate average of a subrating
  const avg = (key: keyof Member["stats"]["subratings"]) =>
    members.reduce((sum, p) => sum + p.stats.subratings[key], 0) / count;

  const avgKd = members.reduce((sum, p) => sum + p.stats.fdRatio, 0) / count;
  const avgWin = members.reduce((sum, p) => sum + p.stats.winRatePct, 0) / count;

  const stats = {
    combat: avg("combat"),
    survival: avg("survived"),
    support: avg("support"),
    tactics: avg("feedback"),
    victory: avgWin,
    kdr: avgKd,
  };

  console.log(stats);

  return {
    name: "Team",
    color: THEME.primary,
    members,
    stats,
  };
};

export { normalizeTeam, uriToFile };

