import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { WalletState, WalletActions } from "./wallet.types";
import { validateAndNormalizeAddress } from "../../lib/walletValidation";
import { asyncStorage } from "../../lib/storage";

export const useWalletStore = create<WalletState & WalletActions & { _hasHydrated: boolean }>()(
  persist(
    (set) => ({
      walletAddress: null,
      isConnected: false,
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      setWalletAddress: (address) => {
        const result = validateAndNormalizeAddress(address);
        if (!result.valid) {
          return;
        }
        set({
          walletAddress: result.address,
          isConnected: true,
        });
      },
      disconnect: () =>
        set({
          walletAddress: null,
          isConnected: false,
        }),
    }),
    {
      name: "wallet-storage",
      storage: createJSONStorage(() => asyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
