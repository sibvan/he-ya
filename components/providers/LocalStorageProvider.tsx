"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function LocalStorageProvider() {
  useLocalStorage();
  return null;
}
