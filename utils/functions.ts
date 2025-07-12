import { Transaction } from "@/hooks/useFetchTransaction";

export const getTotalDebitCredit = (data: Transaction[] | undefined) => {
  if (!data || data.length === 0) {
    return { debit: 0, credit: 0 };
  }

  return data.reduce(
    (acc, item) => {
      if (item.type === "debit") {
        acc.debit += item.amount;
      } else if (item.type === "credit") {
        acc.credit += item.amount;
      }
      return acc;
    },
    { debit: 0, credit: 0 }
  );
};
