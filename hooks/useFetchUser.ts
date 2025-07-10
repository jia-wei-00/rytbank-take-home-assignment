import { useQuery } from "@tanstack/react-query";
import { userData } from "@/constants/mock-data";

export function useFetchUser(staleTime?: number) {
  return useQuery({
    queryKey: ["userData"],
    staleTime: staleTime || 1000 * 60 * 30, // 30 minutes by default
    queryFn: () => fetch(userData).then((res) => res.json()),
  });
}
