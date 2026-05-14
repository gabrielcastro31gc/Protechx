import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

function getSessionId() {
  let id = sessionStorage.getItem("ptx_session");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("ptx_session", id);
  }
  return id;
}

export function useTrackCTA() {
  return useCallback((ctaName: string) => {
    supabase.from("cta_clicks").insert({
      cta_name: ctaName,
      page_path: window.location.pathname,
      session_id: getSessionId(),
    }).then(() => {});
  }, []);
}