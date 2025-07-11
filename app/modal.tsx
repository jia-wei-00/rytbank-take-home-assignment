import { ScreenContainer } from "@/components";
import { Text } from "@/components/ui/text";
import React from "react";
import { FlatList } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { useLocalSearchParams } from "expo-router";
import { Divider } from "@/components/ui/divider";

export default function ModalScreen() {
  const item = useLocalSearchParams();

  const data = Object.entries(item).map(([key, value]) => ({
    key,
    value,
  }));

  return (
    <ScreenContainer>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <HStack space="sm" className="justify-between p-5">
            <Text bold className="text-typography-900 capitalize">
              {item.key}
            </Text>
            <Text size="sm" className="text-typography-500">
              {item.value}
            </Text>
          </HStack>
        )}
        keyExtractor={(item) => item.key}
        ItemSeparatorComponent={() => <Divider className="my-2" />}
      />
    </ScreenContainer>
  );
}
