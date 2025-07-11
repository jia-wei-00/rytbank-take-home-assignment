import useAuthStore from "@/store/useAuth";

export const useMaskText = () => {
  const isSensitiveDataAuthenticated = useAuthStore(
    (state) => state.isSesitiveDataAuthenticated
  );

  const mask = (text?: string | number) => {
    const stringText = text?.toString();

    if (isSensitiveDataAuthenticated) {
      return stringText;
    }

    return "*".repeat(stringText?.length ?? 0);
  };

  return { mask };
};
