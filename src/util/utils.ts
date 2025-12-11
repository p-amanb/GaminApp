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

  const avg = (key: keyof Member["stats"]["subratings"]) =>
    members.reduce((sum, p) => sum + p.stats.subratings[key], 0) / 4;

  const avgKd = members.reduce((sum, p) => sum + p.stats.fdRatio, 0) / 4;

  const avgWin =members.reduce((sum, p) => sum + p.stats.winRatePct,0)/ 4;

  console.log({
    combat: avg("combat"),
    survival: avg("survived"),
    support: avg("support"),
    tactics: avg("feedback"),
    victory: avgWin,
    kdr: avgKd,
  });

  return {
    name: "Team",
    color: THEME.primary,
    members,
    stats: {
      combat: avg("combat"),
      survival: avg("survived"),
      support: avg("support"),
      tactics: avg("feedback"),
      victory: avgWin,
      kdr: avgKd,
    },
  };
};

export { normalizeTeam, uriToFile };

