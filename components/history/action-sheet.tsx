import React from "react";
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from "@/components/ui/actionsheet";
import dayjs from "dayjs";

interface ActionSheetProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  date: string;
  handleMonthChange: (month: string) => void;
}

const ActionSheet = ({
  visible,
  setVisible,
  date,
  handleMonthChange,
}: ActionSheetProps) => {
  const lastThreeMonths = React.useMemo(() => {
    return [
      dayjs().subtract(2, "month").format("MMMM"),
      dayjs().subtract(1, "month").format("MMMM"),
      dayjs().format("MMMM"),
    ];
  }, []);

  return (
    <Actionsheet isOpen={visible} onClose={() => setVisible(false)}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        {lastThreeMonths.map((month, i) => (
          <ActionsheetItem
            isFocused={month === date}
            onPress={() => handleMonthChange(month)}
            key={i}
          >
            <ActionsheetItemText>{month}</ActionsheetItemText>
          </ActionsheetItem>
        ))}
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default ActionSheet;
