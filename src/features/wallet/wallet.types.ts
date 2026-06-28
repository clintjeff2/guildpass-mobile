export type WalletState = {
  walletAddress: string | null;
  isConnected: boolean;
  _hasHydrated: boolean;
};

export type WalletActions = {
  setWalletAddress: (address: string | null) => void;
  disconnect: () => void;
  setHasHydrated: (state: boolean) => void;
};
