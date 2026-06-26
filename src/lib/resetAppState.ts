import { queryClient } from "./queryClient";
import { asyncStoragePersister } from "./queryPersister";
import { useWalletStore } from "../features/wallet/wallet.store";
import { useSessionStore } from "../features/session/session.store";

export async function resetAppState(): Promise<void> {
  useWalletStore.getState().disconnect();
  await useSessionStore.getState().endSession();
  queryClient.clear();
  await asyncStoragePersister.removeClient();
}
