import { useEffect, useState, useCallback, useRef } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { useAuthStore } from "@/store";
import { AppState } from "react-native";

export function useLocalAuthentication() {
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const appState = useRef(AppState.currentState);
  const setIsSesitiveDataAuthenticated = useAuthStore(
    (state) => state.setIsSesitiveDataAuthenticated
  );
  const isSensitiveDataAuthenticated = useAuthStore(
    (state) => state.isSesitiveDataAuthenticated
  );

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        authenticate("normal");
      }

      if (appState.current !== "active") {
        setIsAuthenticated(false);
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        const available = compatible && enrolled;
        setBiometricAvailable(available);
        if (!available) {
          setIsAuthenticated(true);
          setIsSesitiveDataAuthenticated(true);
        }
      } catch (e) {
        setBiometricAvailable(false);
      }
    })();
  }, []);

  const authenticate = useCallback(
    async (type: "sensitive" | "normal" = "normal") => {
      if (type === "sensitive" && isSensitiveDataAuthenticated) {
        return setIsSesitiveDataAuthenticated(false);
      }

      setIsAuthenticating(true);
      setAuthError(null);
      try {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Authenticate to continue",
          fallbackLabel: "Enter Passcode",
          disableDeviceFallback: false,
        });
        if (!result.success) {
          setAuthError(result.error || "Authentication failed");
        } else {
          if (type === "sensitive") {
            setIsSesitiveDataAuthenticated(true);
          } else {
            setIsAuthenticated(true);
          }
        }
      } catch (e) {
        setAuthError(e instanceof Error ? e.message : "Authentication error");
      } finally {
        setIsAuthenticating(false);
      }
    },
    [isSensitiveDataAuthenticated]
  );

  const authenticateNeeded = biometricAvailable && !isAuthenticated;

  return {
    authenticateNeeded,
    biometricAvailable,
    isAuthenticating,
    authError,
    authenticate,
  };
}
