import React from "react";
import { Text } from "@/components/ui/text";
import dayjs from "dayjs";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Transaction } from "@/hooks/useFetchTransaction";
import { useMaskText } from "@/hooks/useMaskText";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { useAuthStore } from "@/store";
import { useLocalAuthentication } from "@/hooks";

export interface DataBoxProps {
  item: Transaction;
}

const DataBox = ({ item }: DataBoxProps) => {
  const isSesitiveDataAuthenticated = useAuthStore(
    (state) => state.isSesitiveDataAuthenticated
  );
  const { biometricAvailable, authenticate } = useLocalAuthentication();
  const { mask } = useMaskText();
  const router = useRouter();

  const handlePress = () => {
    if (biometricAvailable && !isSesitiveDataAuthenticated) {
      authenticate("sensitive").then((result) => {
        if (!result) return;
        router.push({
          pathname: "/modal",
          params: item,
        });
      });
      return;
    }

    router.push({
      pathname: "/modal",
      params: item,
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <VStack space="sm" className="p-2">
        <HStack space="sm" className="justify-between">
          <Text bold className="text-typography-900">
            {item.description}
          </Text>
          <Text bold className="text-typography-900">
            {mask(
              `${item.type === "debit" ? "-" : "+"} RM${item.amount.toFixed(2)}`
            )}
          </Text>
        </HStack>
        <HStack space="sm" className="justify-between">
          <Text size="sm" className="text-typography-500">
            {item.category}
          </Text>
          <Text size="sm" className="text-typography-500">
            {dayjs(item.timestamp).format("D MMM YYYY, HH:mm")}
          </Text>
        </HStack>
      </VStack>
    </Pressable>
  );
};

export default DataBox;
