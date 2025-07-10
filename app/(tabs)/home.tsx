import React from "react";
import { ScreenContainer } from "@/components";
import { Text } from "@/components/ui/text";
import { FlatList, RefreshControl } from "react-native";
import dayjs from "dayjs";
import { useFetchTransaction, useFetchUser } from "@/hooks";
import { Heading } from "@/components/ui/heading";

const Home = () => {
  const { isPending, error, data, refetch, isRefetching } =
    useFetchTransaction();

  const {
    isPending: isUserPending,
    error: userError,
    data: userData,
  } = useFetchUser();

  return (
    <ScreenContainer>
      <Heading className="uppercase">{dayjs().format("MMMM")}</Heading>
      {isPending && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      <FlatList
        data={data}
        renderItem={({ item }) => <Text>{item.description}</Text>}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={isPending || isRefetching}
            onRefresh={refetch}
          />
        }
      />
    </ScreenContainer>
  );
};

export default Home;
