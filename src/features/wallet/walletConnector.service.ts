import { WalletConnector, WalletConnectorType } from "./walletConnector.types";

/**
 * Manual connector — wraps a pre-validated address so the connector interface
 * stays consistent across all provider types.
 */
export function createManualConnector(address: string): WalletConnector {
  return {
    type: "manual",
    async connect() {
      return [address];
    },
    async disconnect() {},
    async reconnect() {
      return [address];
    },
    async getAccounts() {
      return [address];
    },
  };
}

/**
 * WalletConnect stub — wire up the real WC SDK when the package is added.
 * Throws until a real implementation is provided.
 */
export function createWalletConnectConnector(): WalletConnector {
  const notImplemented = (): never => {
    throw new Error("WalletConnect SDK not yet configured. Add @walletconnect/modal-react-native and a project ID.");
  };
  return {
    type: "walletconnect",
    connect: notImplemented,
    disconnect: notImplemented,
    reconnect: notImplemented,
    getAccounts: notImplemented,
  };
}

/** Registry of available connector factories */
const connectorFactories: Record<WalletConnectorType, (() => WalletConnector) | null> = {
  manual: null, // constructed via createManualConnector(address)
  walletconnect: createWalletConnectConnector,
  coinbase: null, // future: createCoinbaseConnector
  metamask: null, // future: createMetaMaskConnector
};

export function isConnectorTypeSupported(type: WalletConnectorType): boolean {
  return connectorFactories[type] !== null;
}
