import { UserStats } from "../types";
import { APP_CONFIG } from "../config";

export const StorageService = {
  getStats: (): UserStats => {
    try {
      const saved = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.STATS);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Failed to load stats", e);
      return {};
    }
  },

  saveStats: (stats: UserStats): void => {
    try {
      localStorage.setItem(APP_CONFIG.STORAGE_KEYS.STATS, JSON.stringify(stats));
    } catch (e) {
      console.error("Failed to save stats", e);
    }
  },

  getVerifiedIds: (): string[] => {
    try {
      const saved = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.VERIFIED);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  },

  saveVerifiedIds: (ids: string[]): void => {
    try {
      localStorage.setItem(APP_CONFIG.STORAGE_KEYS.VERIFIED, JSON.stringify(ids));
    } catch (e) {
      console.error("Failed to save verified IDs", e);
    }
  }
};
