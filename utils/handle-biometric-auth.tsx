import * as LocalAuthentication from "expo-local-authentication";
import { useState, useCallback, useEffect } from "react";
import { AppState } from "react-native";
import useAuthStore from "@/store/useAuth";

export const useHandleBiometricAuth = () => {
  const [isLocalAuthenticated, setIsLocalAuthenticated] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "background") {
        setIsLocalAuthenticated(false);
        console.log("App is in background");
      }

      if (nextAppState === "active") {
        console.log("Checking biometric support");
        (async () => {
          const isBiometricAvailable =
            await LocalAuthentication.hasHardwareAsync();

          if (isBiometricAvailable) {
            handleBiometricAuth();
          } else {
            console.log("Biometric not supported");
            setIsLocalAuthenticated(true);
          }
        })();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleBiometricAuth = useCallback(async () => {
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

    if (!isBiometricAvailable) {
      return setIsLocalAuthenticated(true);
    }

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with biometric",
      cancelLabel: "Cancel",
    });

    if (biometricAuth) {
      if (biometricAuth.success) {
        console.log("Biometric authentication successful");
        setIsLocalAuthenticated(true);
      }
    }
  }, []);

  return { handleBiometricAuth, isLocalAuthenticated };
};
