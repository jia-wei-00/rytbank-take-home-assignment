import React from "react";
import { Text } from "@/components/ui/text";
import dayjs from "dayjs";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Transaction } from "@/hooks/useFetchTransaction";

interface DataBoxProps {
  item: Transaction;
}

const DataBox = ({ item }: DataBoxProps) => {
  return (
    <VStack space="sm" className="p-2">
      <HStack space="sm" className="justify-between">
        <Text bold className="text-typography-900">
          {item.description}
        </Text>
        <Text bold className="text-typography-900">
          {item.type === "debit" ? "-" : "+"}
          RM{item.amount}
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
  );
};

export default DataBox;
