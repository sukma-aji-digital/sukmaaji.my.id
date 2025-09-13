"use client";

import { useEffect } from "react";

export default function CacheBuster() {
  useEffect(() => {
    // Clear all browser caches on app load
    const clearCaches = async () => {
      // Clear browser cache API if available
      if ("caches" in window) {
        try {
          const cacheNames = await caches.keys();
          await Promise.all(
            cacheNames.map((cacheName) => {
              console.log("Clearing cache:", cacheName);
              return caches.delete(cacheName);
            })
          );
        } catch (error) {
          console.warn("Could not clear caches:", error);
        }
      }

      // Clear service worker cache
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.ready;
          if (registration.active) {
            registration.active.postMessage({ type: "CLEAR_CACHE" });
          }
        } catch (error) {
          console.warn("Could not clear service worker cache:", error);
        }
      }

      // Clear localStorage (optional - be careful as this might affect user settings)
      // localStorage.clear();

      // Force reload from server on critical updates
      const lastClearTime = localStorage.getItem("lastCacheClear");
      const now = Date.now();
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

      if (!lastClearTime || now - parseInt(lastClearTime) > oneHour) {
        localStorage.setItem("lastCacheClear", now.toString());
        console.log("Cache clearing completed");
      }
    };

    clearCaches();

    // Set up periodic cache clearing
    const interval = setInterval(() => {
      clearCaches();
    }, 30 * 60 * 1000); // Clear every 30 minutes

    return () => clearInterval(interval);
  }, []);

  // Add cache-busting meta tags
  useEffect(() => {
    const head = document.head;
    const timestamp = Date.now();

    // Remove existing cache-busting meta tags
    const existingMetas = head.querySelectorAll("meta[data-cache-buster]");
    existingMetas.forEach((meta) => meta.remove());

    // Add new cache-busting meta tags
    const metaTags = [
      { name: "cache-control", content: "no-cache, no-store, must-revalidate" },
      { name: "pragma", content: "no-cache" },
      { name: "expires", content: "0" },
      { name: "version", content: timestamp.toString() },
    ];

    metaTags.forEach(({ name, content }) => {
      const meta = document.createElement("meta");
      meta.setAttribute("name", name);
      meta.setAttribute("content", content);
      meta.setAttribute("data-cache-buster", "true");
      head.appendChild(meta);
    });

    return () => {
      // Cleanup on unmount
      const metas = head.querySelectorAll("meta[data-cache-buster]");
      metas.forEach((meta) => meta.remove());
    };
  }, []);

  return null; // This component doesn't render anything
}
