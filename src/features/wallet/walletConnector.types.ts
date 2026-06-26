export type WalletConnectorType = "manual" | "walletconnect" | "coinbase" | "metamask";

export interface WalletConnector {
  type: WalletConnectorType;
  connect(): Promise<string[]>;
  disconnect(): Promise<void>;
  reconnect(): Promise<string[]>;
  getAccounts(): Promise<string[]>;
}
