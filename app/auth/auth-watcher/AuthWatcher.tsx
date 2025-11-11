"use client";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUserStore } from "@/app/stores/useUserStore";

export default function AuthWatcher() {
  const supabase = createClient();
  const { setUser, clearUser } = useUserStore();

  useEffect(() => {
    // Cargar usuario actual al montar
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setUser(data.user);
    });

    // Escuchar cambios de sesión (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) setUser(session.user);
      else clearUser();
    });

    return () => subscription.unsubscribe();
  }, [supabase, setUser, clearUser]);

  return null;
}
