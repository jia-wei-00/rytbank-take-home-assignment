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
import { Center } from "@/components/ui/center";
import { Spinner } from "@/components/ui/spinner";

interface HistoryChartProps {
  isLoading: boolean;
  totalDebitCredit: { debit: number; credit: number };
  isSensitiveDataAuthenticated: boolean;
  biometricAvailable: boolean;
  authenticate: (type?: "sensitive" | "normal") => void;
}

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

const HistoryChart = ({
  isLoading,
  totalDebitCredit,
  isSensitiveDataAuthenticated,
  biometricAvailable,
  authenticate,
}: HistoryChartProps) => {
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

  if (!totalDebitCredit) {
    return null;
  }

  return (
    <Center>
      <VStack className="h-[17rem]" space="md">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Center>
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
                              isSensitiveDataAuthenticated
                                ? "eye"
                                : "eye-with-line"
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
                          debitPercentage > creditPercentage
                            ? "Debit"
                            : "Credit"
                        )}
                      </Text>
                    </VStack>
                  );
                }}
              />
            </Center>
            {renderLegendComponent()}
          </>
        )}
      </VStack>
    </Center>
  );
};

export default HistoryChart;
