"use client";

import { useEffect } from "react";
import { ensureFingerprint } from "@/lib/fingerprint";

export function FingerprintBootstrap() {
  useEffect(() => {
    ensureFingerprint();
  }, []);
  return null;
}
