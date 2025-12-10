import { AuthContext } from "@/src/context/AuthContext";
import { AuthProvider } from "@/src/context/AuthProvider";
import { THEME } from "@/src/styles/GlobalStyleSheet";
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
  const { user, isOnboarded,loading  } = auth;
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait until the component is mounted
    setIsReady(true);
  }, []);

    useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
    } else if (!isOnboarded) {
      router.replace("/onboarding");
    } else {
      router.replace("/home");
    }
  }, [user, isOnboarded, loading]);


  return <Slot />; // Always render Slot
}
