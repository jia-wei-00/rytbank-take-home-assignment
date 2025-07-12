import React from "react";
import { ScreenContainer } from "@/components";
import { HistoryChart, ActionSheet } from "@/components/history";
import { useFetchTransaction, useLocalAuthentication } from "@/hooks";
import dayjs from "dayjs";
import { TransactionSection } from "@/components/home";
import { Text } from "@/components/ui/text";
import Entypo from "@expo/vector-icons/Entypo";
import { useAuthStore } from "@/store";
import { getTotalDebitCredit } from "@/utils";

const History = () => {
  const [date, setDate] = React.useState(dayjs().format("MMMM"));
  const [visible, setVisible] = React.useState(false);

  const { isPending, error, data, refetch, isRefetching } =
    useFetchTransaction(date);
  const isSensitiveDataAuthenticated = useAuthStore(
    (state) => state.isSesitiveDataAuthenticated
  );
  const { authenticate, biometricAvailable } = useLocalAuthentication();

  const totalDebitCredit = React.useMemo(() => {
    return getTotalDebitCredit(data);
  }, [data]);

  const handleMonthChange = (date: string) => {
    setDate(date);
    setVisible(false);
  };

  return (
    <ScreenContainer>
      <Text className="text-right p-2">
        <Entypo name="calendar" onPress={() => setVisible(true)} size={24} />
      </Text>
      <HistoryChart
        isLoading={isPending || isRefetching}
        totalDebitCredit={totalDebitCredit}
        isSensitiveDataAuthenticated={isSensitiveDataAuthenticated}
        biometricAvailable={biometricAvailable}
        authenticate={authenticate}
      />
      <TransactionSection
        error={error}
        isPending={isPending}
        data={data}
        isRefetching={isRefetching}
        refetch={refetch}
        totalDebitCredit={totalDebitCredit}
      />
      <ActionSheet
        visible={visible}
        setVisible={setVisible}
        date={date}
        handleMonthChange={handleMonthChange}
      />
    </ScreenContainer>
  );
};

export default History;
