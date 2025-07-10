import React from "react";
import { ScreenContainer } from "@/components";
import dayjs from "dayjs";
import { useFetchTransaction, useFetchUser } from "@/hooks";
import { TopSection } from "@/components/home";
import { TransactionSection } from "@/components/home";
import { Text } from "@/components/ui/text";

const Home = () => {
  const { isPending, error, data, refetch, isRefetching } = useFetchTransaction(
    dayjs().format("MMMM")
  );

  const {
    isPending: isUserPending,
    error: userError,
    data: userData,
    isRefetching: isUserRefetching,
    refetch: userRefetch,
  } = useFetchUser();

  return (
    <ScreenContainer>
      <TopSection
        userData={userData}
        isLoading={isUserPending}
        isUserRefetching={isUserRefetching}
        error={userError}
      />
      <TransactionSection
        error={error}
        isPending={isPending}
        data={data}
        isRefetching={isRefetching}
        refetch={refetch}
        userRefetch={userRefetch}
      />
    </ScreenContainer>
  );
};

export default Home;
