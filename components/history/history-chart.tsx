import React from "react";
import { PieChart } from "react-native-gifted-charts";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { useAuthStore } from "@/store";
import Entypo from "@expo/vector-icons/Entypo";
import { useLocalAuthentication } from "@/hooks";
import { VStack } from "@/components/ui/vstack";
import { useMaskText } from "@/hooks/useMaskText";

interface HistoryChartProps {
  totalDebitCredit: { debit: number; credit: number };
}

const HistoryChart = ({ totalDebitCredit }: HistoryChartProps) => {
  const isSensitiveDataAuthenticated = useAuthStore(
    (state) => state.isSesitiveDataAuthenticated
  );
  const { authenticate, biometricAvailable } = useLocalAuthentication();
  const { mask } = useMaskText();

  const total = totalDebitCredit.debit + totalDebitCredit.credit;
  const debitPercentage = (totalDebitCredit.debit / total) * 100;
  const creditPercentage = (totalDebitCredit.credit / total) * 100;

  const debitColor = "#FF3B30";
  const creditColor = "#34C759";

  const pieData = isSensitiveDataAuthenticated
    ? [
        {
          value: creditPercentage,
          color: creditColor,
          gradientCenterColor: creditColor,
          focused: creditPercentage > debitPercentage,
        },
        {
          value: debitPercentage,
          color: debitColor,
          gradientCenterColor: debitColor,
          focused: debitPercentage > creditPercentage,
        },
      ]
    : [
        {
          value: 100,
          color: "#232B5D",
          gradientCenterColor: "#232B5D",
        },
      ];

  const renderDot = (color: string) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <HStack className="justify-center" space="4xl">
          <HStack className="items-center">
            {renderDot(debitColor)}
            <Text>Debit</Text>
          </HStack>
          <HStack className="items-center">
            {renderDot(creditColor)}
            <Text>Credit</Text>
          </HStack>
        </HStack>
      </>
    );
  };

  return (
    <>
      <View style={{ padding: 20, alignItems: "center" }}>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={60}
          innerCircleColor={"#232B5D"}
          centerLabelComponent={() => {
            return (
              <VStack className="items-center">
                <Text>
                  {biometricAvailable && (
                    <Entypo
                      name={
                        isSensitiveDataAuthenticated ? "eye" : "eye-with-line"
                      }
                      onPress={() => authenticate("sensitive")}
                      size={20}
                    />
                  )}
                </Text>
                <Text size="2xl" bold>
                  {mask(
                    `${
                      debitPercentage > creditPercentage
                        ? debitPercentage.toFixed(2)
                        : creditPercentage.toFixed(2)
                    }%`
                  )}
                </Text>
                <Text>
                  {mask(
                    debitPercentage > creditPercentage ? "Debit" : "Credit"
                  )}
                </Text>
              </VStack>
            );
          }}
        />
      </View>
      {renderLegendComponent()}
    </>
  );
};

export default HistoryChart;
