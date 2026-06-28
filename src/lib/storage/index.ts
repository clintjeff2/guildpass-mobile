import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { StateStorage } from "zustand/middleware";

/**
 * Storage adapter for non-sensitive data using AsyncStorage.
 */
export const asyncStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(name);
    } catch (e) {
      console.error(`Error reading from AsyncStorage: ${name}`, e);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (e) {
      console.error(`Error writing to AsyncStorage: ${name}`, e);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (e) {
      console.error(`Error removing from AsyncStorage: ${name}`, e);
    }
  },
};

/**
 * Storage adapter for sensitive data using expo-secure-store.
 */
export const secureStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(name);
    } catch (e) {
      console.error(`Error reading from SecureStore: ${name}`, e);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(name, value);
    } catch (e) {
      console.error(`Error writing to SecureStore: ${name}`, e);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(name);
    } catch (e) {
      console.error(`Error removing from SecureStore: ${name}`, e);
    }
  },
};

/**
 * Creates a hybrid storage that delegates fields to different storage engines.
 * @param config Map of field names to their storage engine (asyncStorage or secureStorage)
 * @param defaultStorage Default storage engine for fields not in the config
 */
export function createHybridStorage(
  config: Record<string, StateStorage>,
  defaultStorage: StateStorage = asyncStorage
): StateStorage {
  return {
    getItem: async (name: string): Promise<string | null> => {
      // For simplicity in Zustand persistence, we store the whole state object.
      // A truly hybrid storage for a single Zustand store is tricky because 
      // Zustand's persist middleware expects to get/set the whole state as a single JSON string.
      // To implement a split storage, we'd need to intercept the JSON serialization.
      
      // For now, we'll use this primarily as a way to expose both storages,
      // or we can implement a custom persister that splits the state.
      return await defaultStorage.getItem(name);
    },
    setItem: async (name: string, value: string): Promise<void> => {
      await defaultStorage.setItem(name, value);
    },
    removeItem: async (name: string): Promise<void> => {
      await defaultStorage.removeItem(name);
    },
  };
}
