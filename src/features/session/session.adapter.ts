import { SessionAdapter } from "./session.types";

/**
 * No-op adapter — wallet connected state is treated as authenticated.
 * Replace with a real SIWE or backend adapter when backend support is ready.
 */
export const noopSessionAdapter: SessionAdapter = {
  async signIn(walletAddress) {
    return { token: `noop:${walletAddress}`, expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000 };
  },
  async refresh(token) {
    return { token, expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000 };
  },
  async signOut(_token) {
    // nothing to do
  },
};
