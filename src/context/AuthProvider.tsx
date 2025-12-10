interface User {
  id: string;
  name: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

import { useRouter } from "expo-router";
import { ReactNode, useEffect, useState } from "react";
import { Toast } from "toastify-react-native";
import userService from "../service/UserService";
import { getTokens, saveTokens } from "../util/token";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userData, setUserData] = useState<any | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadSession = async () => {
    const { accessToken } = await getTokens();
    if (accessToken) {
      try {
        const data = await userService.getUserWithPlayer();
        console.log(data)
        setUser(data.user);
        setIsOnboarded(data.user.profileComplete);
        setUserData(data);
      } catch {}
    }
    setLoading(false); // done loading
  };

  loadSession();
}, []);



  const login = async (phone: string) => {
    try {
      setPhoneNumber(phone);
      const resp = await userService.register({ phoneNumber: phone.replace(/^\+/, "") });
      console.log(resp);
      Toast.show({
        type: "success",
        autoHide: true,
        text1: resp.message,
      });
      router.replace("/otp");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
        position: "bottom",
        visibilityTime: 4000,
        autoHide: true,
      });
    }
  };

  const verifyOtp = async (code: string) => {
    try {
      console.log(phoneNumber,code);
      const resp = await userService.verifyOtp({
        phoneNumber: phoneNumber.replace(/^\+/, ""),
        code: code,
      });
      console.log(resp);
      saveTokens(resp.accessToken, resp.refreshToken);
      Toast.show({
        type: "success",
        autoHide: true,
        text1: "Phone verified successfully",
      });
      setUser(resp.user);
      setIsOnboarded(resp.user.profileComplete)
      if (resp.user.profileComplete) {
        
        router.replace("/home");
      } else {
        router.replace("/onboarding");
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response.data.message || error.message,
        position: "bottom",
        visibilityTime: 4000,
        autoHide: true,
      });
    }
  };

  const completeOnboarding = async(user: any) => {
    setUser(user);
    setIsOnboarded(user.profileComplete);
    try {
      const data = await userService.getUserWithPlayer();
      setUserData(data)
    } catch (error) {
      
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isOnboarded,
        userData,
        setUserData,
        login,
        verifyOtp,
        loading,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
