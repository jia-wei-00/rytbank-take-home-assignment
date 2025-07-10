import { useQuery } from "@tanstack/react-query";
import { transactionData } from "@/constants/mock-data";

export function useFetchTransaction(staleTime?: number) {
  return useQuery({
    queryKey: ["transactionData"],
    staleTime: staleTime || 1000 * 60 * 30, // 30 minutes by default
    queryFn: () => fetch(transactionData).then((res) => res.json()),
  });
}
