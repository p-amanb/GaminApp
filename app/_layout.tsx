import { AuthContext } from "@/src/context/AuthContext";
import { AuthProvider } from "@/src/context/AuthProvider";
import { THEME } from "@/src/styles/GlobalStyleSheet";
import { getTokens } from "@/src/util/token";
import { Slot, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StatusBar } from "react-native";
import ToastManager from "toastify-react-native";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ToastManager />
      <StatusBar barStyle="light-content" backgroundColor={THEME.bg} />
      <Navigator />
    </AuthProvider>
  );
}

function Navigator() {
  const auth = useContext(AuthContext)!;
  const { user, isOnboarded } = auth;
  const router = useRouter();
  const [isReady, setIsReady] = useState(false); // ✅ Track mounting

  useEffect(() => {
    // Wait until the component is mounted
    setIsReady(true);
  }, []);

  useEffect(() => {
  const redirect = async () => {
    try {
      const {accessToken} = await getTokens()

      if (accessToken && isOnboarded) {
        router.replace("/home");
        return;
      }

      // Wait until mounting is ready
      if (!isReady) return;
      console.log(isOnboarded)
      // Normal flow
      if (!user) {
        router.replace("/login");
      } else if (!isOnboarded) {
        router.replace("/onboarding");
      } else {
        router.replace("/home");
      }
    } catch (error) {
      console.error("Error checking token:", error);
    }
  };

  redirect();
}, [user, isOnboarded, isReady]);

  return <Slot />; // Always render Slot
}
