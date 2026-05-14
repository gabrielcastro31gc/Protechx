import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

function getSessionId() {
  let id = sessionStorage.getItem("ptx_session");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("ptx_session", id);
  }
  return id;
}

export default function PageTracker() {
  const location = useLocation();
  const startTime = useRef(Date.now());
  const lastPath = useRef<string | null>(null);
  const logged = useRef(false);

  useEffect(() => {
    // Don't track admin pages
    if (location.pathname.startsWith("/admin")) return;

    const currentPath = location.pathname;

    // If we navigated away from a previous page, update its duration
    if (lastPath.current && lastPath.current !== currentPath) {
      const duration = Math.round((Date.now() - startTime.current) / 1000);
      supabase.from("page_views").insert({
        page_path: lastPath.current,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        screen_width: window.innerWidth,
        session_id: getSessionId(),
        duration_seconds: duration,
      });
    }

    // Log new page view
    startTime.current = Date.now();
    lastPath.current = currentPath;
    logged.current = false;

    supabase.from("page_views").insert({
      page_path: currentPath,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      screen_width: window.innerWidth,
      session_id: getSessionId(),
      duration_seconds: 0,
    });

    // On tab close, use sendBeacon with proper headers
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && !logged.current) {
        logged.current = true;
        const duration = Math.round((Date.now() - startTime.current) / 1000);
        const body = JSON.stringify({
          page_path: currentPath,
          duration_seconds: duration,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          screen_width: window.innerWidth,
          session_id: getSessionId(),
        });
        const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/page_views`;
        const blob = new Blob([body], { type: "application/json" });
        const headers = new Headers({
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Prefer: "return=minimal",
        });
        // sendBeacon doesn't support custom headers, use fetch keepalive instead
        fetch(url, {
          method: "POST",
          body: blob,
          headers,
          keepalive: true,
        }).catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [location.pathname]);

  return null;
}
