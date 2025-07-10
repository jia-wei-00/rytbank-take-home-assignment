import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { userData } from "@/constants/mock-data";

export type User = {
  userId: string;
  fullName: string;
  dateOfBirth: string;
  nationalId: string;
  contact: {
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
  kycStatus: "verified" | "pending" | "rejected";
  createdAt: string;
  lastLoginAt: string;
  security: {
    twoFactorEnabled: boolean;
    preferred2faMethod: "authenticator_app" | "sms" | "email";
  };
  accounts: Array<{
    accountId: string;
    type: "debit_card" | "credit_card" | "savings";
    accountNumber: string;
    currency: string;
    balance: number;
    openedAt: string;
    transactions: Array<{
      txnId: string;
      timestamp: number;
      date: string;
      amount: number;
      description: string;
      category: string;
      channel: string;
      status: string;
      balanceAfter: number;
    }>;
  }>;
  preferences: {
    language: string;
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
  };
};

export function useFetchUser(staleTime?: number): UseQueryResult<User, Error> {
  return useQuery<User, Error>({
    queryKey: ["userData"],
    staleTime: staleTime || 1000 * 60 * 30, // 30 minutes by default
    queryFn: async () => {
      const res = await fetch(userData);
      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }
      return res.json() as Promise<User>;
    },
  });
}
