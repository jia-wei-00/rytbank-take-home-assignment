import React from "react";
import { Text } from "@/components/ui/text";
import { Divider } from "@/components/ui/divider";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { User } from "@/hooks/useFetchUser";
import { SkeletonText } from "@/components/ui/skeleton";
import { useMaskText } from "@/hooks/useMaskText";
import Entypo from "@expo/vector-icons/Entypo";
import { useAuthStore } from "@/store";
import { useLocalAuthentication } from "@/hooks";

interface TopSectionProps {
  userData?: User;
  isLoading: boolean;
  isUserRefetching: boolean;
  error: Error | null;
}

const TopSection = ({
  userData,
  isLoading: isLoadingUser,
  isUserRefetching,
  error,
}: TopSectionProps) => {
  const isSensitiveDataAuthenticated = useAuthStore(
    (state) => state.isSesitiveDataAuthenticated
  );
  const { authenticate, biometricAvailable } = useLocalAuthentication();

  const isLoading = React.useMemo(() => {
    return isLoadingUser || isUserRefetching;
  }, [isLoadingUser, isUserRefetching]);

  const { mask } = useMaskText();

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <Box className="bg-background-50 rounded-lg shadow-sm p-2">
      <HStack space="sm" className="flex-row items-center justify-center">
        <Text bold size="xl">
          Hi,
        </Text>
        <Text bold size="xl">
          {isLoading ? (
            <SkeletonText className="h-3 w-20" speed={4} />
          ) : (
            userData?.fullName
          )}
        </Text>
      </HStack>
      <Divider className="my-2" />
      <HStack space="sm" className="flex-row items-center">
        <VStack space="sm" className="flex-1 rounded-lg bg-background-50 p-2">
          <Text bold size="xl" className="text-center">
            Account Number
          </Text>
          <Text size="lg" className="text-center">
            {isLoading ? (
              <SkeletonText className="h-7 w-20" speed={4} />
            ) : (
              mask(userData?.accounts[0].accountNumber)
            )}
          </Text>
        </VStack>
        <Divider orientation="vertical" className="h-10" />
        <VStack space="sm" className="flex-1 rounded-lg bg-background-50 p-2">
          <Text bold size="xl" className="text-center">
            Balance{" "}
            {biometricAvailable && (
              <Entypo
                name={isSensitiveDataAuthenticated ? "eye" : "eye-with-line"}
                onPress={() => authenticate("sensitive")}
                size={16}
              />
            )}
          </Text>
          <Text size="lg" className="text-center">
            {isLoading ? (
              <SkeletonText className="h-7 w-20" speed={4} />
            ) : (
              `${userData?.accounts[0].currency} ${mask(
                userData?.accounts[0].balance
              )}`
            )}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default TopSection;
