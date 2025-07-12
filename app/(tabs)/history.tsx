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

  return (
    <ScreenContainer>
      <Text className="text-right p-2">
        <Entypo name="calendar" onPress={() => setVisible(true)} size={24} />
      </Text>
      <HistoryChart data={data} />
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
