import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Pressable } from "react-native";

interface LocalAuthenticateProps {
  authenticate: () => Promise<void>;
  isAuthenticating: boolean;
  authError: string | null;
}

const LocalAuthenticate = ({
  authenticate,
  isAuthenticating,
  authError,
}: LocalAuthenticateProps) => {
  return (
    <Center className="h-screen">
      <Pressable onPress={authenticate}>
        <VStack space="lg">
          {isAuthenticating ? (
            <Text>Authenticating...</Text>
          ) : (
            <>
              <Center>
                <Entypo name="fingerprint" size={50} color="white" />
              </Center>
              <Text>Tap to unlock</Text>
            </>
          )}

          {authError && <Text>{authError}</Text>}
        </VStack>
      </Pressable>
    </Center>
  );
};

export default LocalAuthenticate;
