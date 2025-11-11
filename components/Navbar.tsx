"use client";
import { usePathname } from "next/navigation";
import BackButtonClient from "./BackButtonClient";
import { useProjectStore } from "@/app/stores/useProjectStore";
import { LogoutButton } from "./logout-button";
import { useUserStore } from "@/app/stores/useUserStore";

export default function Navbar() {
  const pathname = usePathname();
  const currentProject = useProjectStore((state) => state.currentProject);
  const nombre =
    currentProject?.Contrato.split(" - ")[1] || currentProject?.Contrato;

  const user = useUserStore((state) => state.user);
  const userName = user?.user_metadata.email || user?.email;

  return (
    <nav className="flex items-center justify-between px-11 h-[100px] border-solid border-b-[1px] border-b-gray-400">
      <div className="flex items-center gap-4">
        {/* ahora esto es un Client Component */}
        {pathname !== "/dashboard" && <BackButtonClient />}
        <h1 className="text-2xl font-semibold text-gray-800">
          Control de contratos
          {pathname === "/dashboard/proyectos" && <span> | Proyectos</span>}
          {pathname.startsWith("/dashboard/proyectos/") && (
            <span> | {nombre}</span>
          )}
        </h1>
      </div>

      <div className="flex justify-center items-center gap-4">
        <p className="font-semibold text-zinc-600">{userName}</p>
        {/* Logout on the top-right (kept as your form) */}
        <LogoutButton />
      </div>
    </nav>
  );
}
