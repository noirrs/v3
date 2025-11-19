"use client";

import { useVisitorTracking } from "@/hooks/useVisitorTracking";

export default function ClientVisitorTracker() {
  useVisitorTracking();
  return null;
}
