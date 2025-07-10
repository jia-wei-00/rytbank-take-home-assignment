import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { transactionData } from "@/constants/mock-data";

export type Transaction = {
  id: number;
  transactionNumber: string;
  timestamp: number;
  date: string;
  month: string;
  amount: number;
  description: string;
  category: string;
  type: "debit" | "credit";
  balance: number;
};

export function useFetchTransaction(
  month?: string,
  staleTime?: number
): UseQueryResult<Transaction[], Error> {
  return useQuery({
    queryKey: ["transactionData", month],
    staleTime: staleTime || 1000 * 60 * 30, // 30 minutes by default
    queryFn: async () => {
      const res = await fetch(transactionData);
      if (!res.ok) {
        throw new Error("Failed to fetch transaction data");
      }
      const data = (await res.json()) as Transaction[];

      if (month) {
        return data.filter(
          (item) => item.month.toLowerCase() === month.toLowerCase()
        );
      }

      return data;
    },
  });
}
