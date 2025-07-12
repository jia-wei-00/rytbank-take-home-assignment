import React from "react";
import { ScreenContainer } from "@/components";
import { HistoryChart } from "@/components/history";
import { useFetchTransaction } from "@/hooks";
import dayjs from "dayjs";
import { TransactionSection } from "@/components/home";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Text } from "@/components/ui/text";

import Entypo from "@expo/vector-icons/Entypo";

const History = () => {
  const [date, setDate] = React.useState(dayjs().toDate());
  const [visible, setVisible] = React.useState(false);

  const { isPending, error, data, refetch, isRefetching } = useFetchTransaction(
    dayjs(date).format("MMMM")
  );

  const totalDebitCredit = React.useMemo(() => {
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
    <ScreenContainer>
      <Text className="text-right p-2">
        <Entypo name="calendar" onPress={() => setVisible(true)} size={24} />
      </Text>
      <HistoryChart totalDebitCredit={totalDebitCredit} />
      <TransactionSection
        error={error}
        isPending={isPending}
        data={data}
        isRefetching={isRefetching}
        refetch={refetch}
      />

      {visible && (
        <RNDateTimePicker
          mode="date"
          value={date}
          onChange={(_, selectedDate) => {
            selectedDate && setDate(selectedDate);
            setVisible(false);
          }}
          display="inline"
          maximumDate={dayjs().toDate()}
          minimumDate={dayjs().subtract(2, "month").toDate()}
        />
      )}
    </ScreenContainer>
  );
};

export default History;
