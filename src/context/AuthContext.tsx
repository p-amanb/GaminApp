import { createContext } from "react";

export interface User {
  id: string;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  isOnboarded: boolean;
  userData: any;
  setUserData:Function;
  login: (phone: string) => void;
  verifyOtp: (code:string) => void;
  completeOnboarding: (user:any) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
