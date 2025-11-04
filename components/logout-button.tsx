"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <button
      onClick={logout}
      className="bg-red-600 text-white font-extrabold px-4 py-2 rounded-2xl hover:bg-red-700 transition-colors hover:cursor-pointer"
    >
      Cerrar Sesión
    </button>
  );
}
