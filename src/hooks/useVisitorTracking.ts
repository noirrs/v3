"use client";

import { useEffect } from "react";

interface LocationData {
  country: string;
  city: string;
  latitude: number;
  longitude: number;
}

async function getLocationData(): Promise<LocationData> {
  try {
    // Using ip-api.com free tier (no key required)
    const response = await fetch("https://ip-api.com/json/", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return {
        country: data.country || "Unknown",
        city: data.city || "Unknown",
        latitude: data.lat || 0,
        longitude: data.lon || 0,
      };
    }
  } catch (error) {
    console.debug("Location fetch failed:", error);
  }

  return {
    country: "Unknown",
    city: "Unknown",
    latitude: 0,
    longitude: 0,
  };
}

function detectDeviceType(): string {
  if (typeof window === "undefined") return "unknown";

  const ua = navigator.userAgent;
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
    return "mobile";
  }
  if (/ipad|android|tablet/i.test(ua)) {
    return "tablet";
  }
  return "desktop";
}

function detectDeviceName(): string {
  if (typeof window === "undefined") return "Unknown Device";

  const ua = navigator.userAgent;

  // iOS devices
  if (/iPhone/i.test(ua)) return "iPhone";
  if (/iPad/i.test(ua)) return "iPad";
  if (/MacOS|Macintosh/i.test(ua)) {
    if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return "Mac (Safari)";
    return "Mac";
  }

  // Android devices
  if (/Android/i.test(ua)) {
    if (/SM-G|Galaxy/i.test(ua)) return "Samsung Galaxy";
    if (/Pixel/i.test(ua)) return "Google Pixel";
    if (/OnePlus/i.test(ua)) return "OnePlus";
    if (/Xiaomi|Redmi/i.test(ua)) return "Xiaomi";
    return "Android Device";
  }

  // Windows
  if (/Windows|Win32/i.test(ua)) {
    if (/Windows NT 10.0/i.test(ua)) return "Windows 10/11";
    if (/Windows NT 6.3/i.test(ua)) return "Windows 8.1";
    return "Windows";
  }

  // Linux
  if (/Linux/i.test(ua)) return "Linux";

  // Browser-based detection
  if (/Chrome/i.test(ua) && !/Edge|Chromium/i.test(ua)) return "Chrome OS";
  if (/Firefox/i.test(ua)) return "Linux/Firefox";

  return "Unknown Device";
}

async function trackVisitor() {
  try {
    const isDarkMode = document.documentElement.classList.contains("dark");
    const locationData = await getLocationData();

    const demographics = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      language: navigator.language || "Unknown",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      country: locationData.country,
      city: locationData.city,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      deviceType: detectDeviceType(),
      deviceName: detectDeviceName(),
      referrer: document.referrer || "Direct",
      isDarkMode,
    };

    // Send to your API
    console.log("[Tracking] Sending demographics data...");
    const response = await fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(demographics),
    });
    console.log("[Tracking] Response status:", response.status);
    const result = await response.json();
    console.log("[Tracking] Response:", result);
  } catch (error) {
    console.error("[Tracking] Error:", error);
  }
}

export function useVisitorTracking() {
  useEffect(() => {
    // Track on page load, but delay slightly to ensure DOM is ready
    const timer = setTimeout(() => {
      trackVisitor();
    }, 100);

    return () => clearTimeout(timer);
  }, []);
}
