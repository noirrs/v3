/* eslint-disable @typescript-eslint/no-explicit-any */
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
    // Try multiple geolocation services in order

    // First try: ipapi.co (reliable, no key required)
    try {
      const response = await fetch("https://ipapi.co/json/", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.country_name && data.city) {
          return {
            country: data.country_name || "Unknown",
            city: data.city || "Unknown",
            latitude: parseFloat(data.latitude) || 0,
            longitude: parseFloat(data.longitude) || 0,
          };
        }
      }
    } catch (e) {
      console.debug("ipapi.co failed:", e);
    }

    // Fallback: ip-api.com
    try {
      const response = await fetch(
        "https://ip-api.com/json/?fields=country,city,lat,lon",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        if (data.country && data.city) {
          return {
            country: data.country || "Unknown",
            city: data.city || "Unknown",
            latitude: data.lat || 0,
            longitude: data.lon || 0,
          };
        }
      }
    } catch (e) {
      console.debug("ip-api.com failed:", e);
    }

    // Last resort: ipinfo.io (free tier)
    try {
      const response = await fetch("https://ipinfo.io/json", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.country && data.city) {
          const [lat, lon] = (data.loc || "0,0").split(",").map(parseFloat);
          return {
            country: data.country || "Unknown",
            city: data.city || "Unknown",
            latitude: lat || 0,
            longitude: lon || 0,
          };
        }
      }
    } catch (e) {
      console.debug("ipinfo.io failed:", e);
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

function detectBrowser(): { name: string; version: string } {
  if (typeof window === "undefined")
    return { name: "Unknown", version: "Unknown" };

  const ua = navigator.userAgent;
  let browserName = "Unknown";
  let browserVersion = "Unknown";

  // Edge (Chromium-based)
  if (/Edg\//.test(ua)) {
    browserName = "Edge";
    const match = ua.match(/Edg\/(\d+\.?\d*)/);
    browserVersion = match ? match[1] : "Unknown";
  }
  // Chrome
  else if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) {
    browserName = "Chrome";
    const match = ua.match(/Chrome\/(\d+\.?\d*)/);
    browserVersion = match ? match[1] : "Unknown";
  }
  // Safari
  else if (/Safari\//.test(ua) && !/Chrome/.test(ua)) {
    browserName = "Safari";
    const match = ua.match(/Version\/(\d+\.?\d*)/);
    browserVersion = match ? match[1] : "Unknown";
  }
  // Firefox
  else if (/Firefox\//.test(ua)) {
    browserName = "Firefox";
    const match = ua.match(/Firefox\/(\d+\.?\d*)/);
    browserVersion = match ? match[1] : "Unknown";
  }
  // Opera
  else if (/OPR\//.test(ua) || /Opera\//.test(ua)) {
    browserName = "Opera";
    const match = ua.match(/(?:OPR|Opera)\/(\d+\.?\d*)/);
    browserVersion = match ? match[1] : "Unknown";
  }

  return { name: browserName, version: browserVersion };
}

function detectOS(): string {
  if (typeof window === "undefined") return "Unknown";

  const ua = navigator.userAgent;

  // Windows
  if (/Windows NT 10.0/.test(ua)) return "Windows 10/11";
  if (/Windows NT 6.3/.test(ua)) return "Windows 8.1";
  if (/Windows NT 6.2/.test(ua)) return "Windows 8";
  if (/Windows NT 6.1/.test(ua)) return "Windows 7";
  if (/Windows/.test(ua)) return "Windows";

  // macOS
  if (/Mac OS X (\d+[._]\d+)/.test(ua)) {
    const match = ua.match(/Mac OS X (\d+)[._](\d+)/);
    if (match) {
      const major = match[1];
      const minor = match[2];
      return `macOS ${major}.${minor}`;
    }
    return "macOS";
  }

  // iOS
  if (/iPhone OS (\d+[._]\d+)/.test(ua)) {
    const match = ua.match(/iPhone OS (\d+)[._](\d+)/);
    if (match) return `iOS ${match[1]}.${match[2]}`;
    return "iOS";
  }
  if (/iPad/.test(ua)) return "iPadOS";

  // Android
  if (/Android (\d+\.?\d*)/.test(ua)) {
    const match = ua.match(/Android (\d+\.?\d*)/);
    if (match) return `Android ${match[1]}`;
    return "Android";
  }

  // Linux
  if (/Linux/.test(ua)) return "Linux";

  // ChromeOS
  if (/CrOS/.test(ua)) return "ChromeOS";

  return "Unknown";
}

function detectConnectionType(): string {
  if (typeof navigator === "undefined") return "Unknown";

  // Check if NetworkInformation API is available
  const connection =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;

  if (connection) {
    if (connection.effectiveType) {
      return connection.effectiveType; // Returns: 'slow-2g', '2g', '3g', '4g'
    }
    if (connection.type) {
      return connection.type; // Returns: 'wifi', 'cellular', etc.
    }
  }

  return "Unknown";
}

// Generate or retrieve visitor ID (in-memory only, not persisted to browser)
let memoryVisitorId: string | null = null;

function getVisitorId(): string {
  if (!memoryVisitorId) {
    // Generate a unique ID: timestamp + random string
    memoryVisitorId = `v_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  return memoryVisitorId;
}

interface TrackingData {
  timestamp: string;
  userAgent: string;
  language: string;
  timezone: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  screenWidth: number;
  screenHeight: number;
  deviceType: string;
  deviceName: string;
  browserName: string;
  browserVersion: string;
  os: string;
  connectionType: string;
  referrer: string;
  isDarkMode: boolean;
  visitedDomain: string;
  visitedUrl: string;
  visitorId: string;
  eventType?: "page_load" | "section_view";
  sectionName?: string;
}

async function trackVisitor() {
  try {
    const isDarkMode = document.documentElement.classList.contains("dark");
    const locationData = await getLocationData();
    const visitorId = getVisitorId();
    const browser = detectBrowser();

    const demographics: TrackingData = {
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
      browserName: browser.name,
      browserVersion: browser.version,
      os: detectOS(),
      connectionType: detectConnectionType(),
      referrer: document.referrer || "Direct",
      isDarkMode,
      visitedDomain: window.location.hostname,
      visitedUrl: window.location.href,
      visitorId,
      eventType: "page_load",
    };

    console.log("[Tracking] Sending demographics data...");
    console.log(
      "[Tracking] Location:",
      demographics.city,
      demographics.country,
    );
    console.log("[Tracking] Visitor ID:", visitorId);
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

// Track section views
export async function trackSectionView(sectionName: string) {
  // Don't track skills section (default landing page)
  if (sectionName === "skills") {
    return;
  }

  try {
    const visitorId = getVisitorId();
    const isDarkMode = document.documentElement.classList.contains("dark");
    const browser = detectBrowser();

    const trackingData: TrackingData = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      language: navigator.language || "Unknown",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      country: "Unknown", // We already have this from initial load
      city: "Unknown",
      latitude: 0,
      longitude: 0,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      deviceType: detectDeviceType(),
      deviceName: detectDeviceName(),
      browserName: browser.name,
      browserVersion: browser.version,
      os: detectOS(),
      connectionType: detectConnectionType(),
      referrer: document.referrer || "Direct",
      isDarkMode,
      visitedDomain: window.location.hostname,
      visitedUrl: window.location.href,
      visitorId,
      eventType: "section_view",
      sectionName,
    };

    console.log(`[Tracking] Section view: ${sectionName}`);
    console.log("[Tracking] Visitor ID:", visitorId);

    await fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trackingData),
    });
  } catch (error) {
    console.error("[Tracking] Section view error:", error);
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
