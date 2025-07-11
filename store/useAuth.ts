import { create } from "zustand";

interface AuthStore {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isSesitiveDataAuthenticated: boolean;
  setIsSesitiveDataAuthenticated: (
    isSesitiveDataAuthenticated: boolean
  ) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  isSesitiveDataAuthenticated: false,
  setIsSesitiveDataAuthenticated: (isSesitiveDataAuthenticated: boolean) =>
    set({ isSesitiveDataAuthenticated }),
}));

export default useAuthStore;
