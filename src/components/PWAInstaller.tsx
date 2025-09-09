"use client";

import { useEffect } from "react";

export default function PWAInstaller() {
  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    }

    // Handle install prompt
    let deferredPrompt: any;

    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      deferredPrompt = e;

      // Show install button or banner
      const installBanner = document.createElement("div");
      installBanner.id = "install-banner";
      installBanner.innerHTML = `
        <div style="
          position: fixed; 
          bottom: 20px; 
          right: 20px; 
          background: linear-gradient(135deg, #6366f1, #4f46e5); 
          color: white; 
          padding: 16px 20px; 
          border-radius: 12px; 
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
          z-index: 1000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 14px;
          max-width: 320px;
          display: flex;
          align-items: center;
          gap: 12px;
        ">
          <div style="flex: 1;">
            <div style="font-weight: 600; margin-bottom: 4px;">Install Sukma Aji Digital</div>
            <div style="opacity: 0.9; font-size: 12px;">Akses lebih cepat dengan install aplikasi</div>
          </div>
          <div>
            <button id="install-btn" style="
              background: rgba(255, 255, 255, 0.2);
              border: 1px solid rgba(255, 255, 255, 0.3);
              color: white;
              padding: 8px 16px;
              border-radius: 8px;
              font-size: 12px;
              cursor: pointer;
              font-weight: 500;
              transition: all 0.2s;
            ">
              Install
            </button>
            <button id="close-banner" style="
              background: none;
              border: none;
              color: white;
              margin-left: 8px;
              cursor: pointer;
              opacity: 0.7;
              font-size: 18px;
              line-height: 1;
            ">
              ×
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(installBanner);

      // Handle install button click
      document.getElementById("install-btn")?.addEventListener("click", () => {
        // Hide the banner
        installBanner.remove();
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the install prompt");
          } else {
            console.log("User dismissed the install prompt");
          }
          deferredPrompt = null;
        });
      });

      // Handle close button click
      document.getElementById("close-banner")?.addEventListener("click", () => {
        installBanner.remove();
      });

      // Auto hide after 10 seconds
      setTimeout(() => {
        if (document.getElementById("install-banner")) {
          installBanner.remove();
        }
      }, 10000);
    });

    // Track app install
    window.addEventListener("appinstalled", (evt) => {
      console.log("PWA was installed");
      // Track this event with your analytics
    });

    // Handle app shortcuts
    if ("navigator" in window && "getInstalledRelatedApps" in navigator) {
      // Check if the app is already installed
      (navigator as any).getInstalledRelatedApps().then((relatedApps: any) => {
        if (relatedApps.length > 0) {
          console.log("App is already installed");
        }
      });
    }
  }, []);

  return null;
}
