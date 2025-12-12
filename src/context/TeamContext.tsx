// TeamContext.tsx
import React, { createContext, useContext, useState } from "react";

type TeamContextType = {
  teams: any[];
  setTeams: (teams: any[]) => void;
};

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider = ({ children }: { children: React.ReactNode }) => {
  const [teams, setTeams] = useState<any[]>([]);
  return (
    <TeamContext.Provider value={{ teams, setTeams }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeamContext = () => {
  const context = useContext(TeamContext);
  if (!context) throw new Error("useTeamContext must be inside TeamProvider");
  return context;
};
