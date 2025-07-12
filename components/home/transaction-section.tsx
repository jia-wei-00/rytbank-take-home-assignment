import React from "react";
import { DataBox } from "@/components";
import { Text } from "@/components/ui/text";
import { FlatList, RefreshControl } from "react-native";
import { Divider } from "@/components/ui/divider";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Transaction } from "@/hooks";
import { SkeletonText } from "../ui/skeleton";
import { useMaskText } from "@/hooks/useMaskText";
import { View } from "react-native";
import { VStack } from "../ui/vstack";

interface TransactionSectionProps {
  error: Error | null;
  isPending: boolean;
  data: Transaction[] | undefined;
  isRefetching: boolean;
  refetch: () => void;
  userRefetch?: () => void;
  totalDebitCredit?: { debit: number; credit: number };
}

const TransactionSection = ({
  error,
  isPending,
  data,
  isRefetching,
  refetch,
  userRefetch,
  totalDebitCredit,
}: TransactionSectionProps) => {
  const { mask } = useMaskText();

  const isLoading = React.useMemo(() => {
    return isPending || isRefetching;
  }, [isPending, isRefetching]);

  const getTotalDebitCredit = React.useMemo(() => {
    if (totalDebitCredit) {
      return totalDebitCredit;
    }

    if (!data || data.length === 0) {
      return { debit: 0, credit: 0 };
    }

    return data.reduce(
      (acc, item) => {
        if (item.type === "debit") {
          acc.debit += item.amount;
        } else if (item.type === "credit") {
          acc.credit += item.amount;
        }
        return acc;
      },
      { debit: 0, credit: 0 }
    );
  }, [data]);

  return (
    <VStack space="md" className="flex-1">
      <HStack space="sm">
        <Box className="bg-background-50 rounded-lg shadow-sm p-2 flex-1">
          <Text bold size="lg" className="text-center">
            Total Debit
          </Text>
          <Text size="lg" className="text-center">
            {isLoading ? (
              <SkeletonText className="h-7 w-20" speed={4} />
            ) : (
              `RM${mask(getTotalDebitCredit.debit.toFixed(2))}`
            )}
          </Text>
        </Box>
        <Box className="bg-background-50 rounded-lg shadow-sm p-2 flex-1">
          <Text bold size="lg" className="text-center">
            Total Credit
          </Text>
          <Text size="lg" className="text-center">
            {isLoading ? (
              <SkeletonText className="h-7 w-20" speed={4} />
            ) : (
              `RM${mask(getTotalDebitCredit.credit.toFixed(2))}`
            )}
          </Text>
        </Box>
      </HStack>
      {error && <Text>Error: {error.message}</Text>}
      <Box className="bg-background-50 rounded-lg shadow-sm p-2 flex-1 mb-2">
        {isPending && <Text>Loading...</Text>}
        <FlatList
          data={data}
          renderItem={({ item }) => <DataBox item={item} />}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={isPending || isRefetching}
              onRefresh={() => {
                refetch();
                userRefetch?.();
              }}
            />
          }
          ItemSeparatorComponent={() => <Divider className="my-2" />}
        />
      </Box>
    </VStack>
  );
};

export default TransactionSection;
