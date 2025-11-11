"use client";

import { useEffect, useState } from "react";
import ActionCard from "@/components/ActionCard";
import StatCard from "@/components/StatCard";
import { createClient } from "@/lib/supabase/client";
import { useUserStore } from "../stores/useUserStore";
import { useProjectStore } from "../stores/useProjectStore";

const actionCards = [
  {
    id: "proyectos",
    title: "Proyectos",
    href: "/dashboard/proyectos",
    icon: "person" as const,
  },
  {
    id: "admin",
    title: "Administrador de Proyectos",
    href: "/dashboard/admin",
    icon: "group" as const,
  },
];

const stats = [
  { id: "pactivos", value: 24, label: "Proyectos Activos" },
  { id: "documentos", value: 156, label: "Documentos" },
  { id: "contratos", value: 8, label: "Contratos en uso" },
];

export default function Page() {
  const user = useUserStore((state) => state.user);
  const setListOfProjectsId = useProjectStore(
    (state) => state.setListOfProjectsId
  );
  const [role, setRole] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user?.email) return;

      // Supongamos que tu tabla se llama "profiles" y tiene las columnas: email, role
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("email", user.email)
        .single();

      if (error) {
        console.error("Error al obtener el rol del usuario:", error);
        return;
      }

      setRole(data?.role || "usuario");
    };

    fetchUserRole();
  }, [user, supabase]);

  return (
    <main className="flex flex-col grow bg-gray-50 p-6 md:p-11">
      <section
        aria-labelledby="welcome-title"
        className="w-full max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <h2
              id="welcome-title"
              className="text-3xl md:text-4xl font-bold text-gray-900"
            >
              Bienvenido al Portal
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Seleccione una opción para comenzar
            </p>
          </div>
        </div>

        {/* Cards — mostramos admin solo si el rol es admin */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {actionCards
            .filter((card) => role === "admin" || card.id !== "admin")
            .map((c) => (
              <ActionCard
                key={c.id}
                id={c.id}
                title={c.title}
                href={c.href}
                icon={c.icon}
                ctaText="Ver proyectos"
                testID={`actioncard-${c.id}`}
              />
            ))}
        </div>

        {/* Summary */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Resumen General
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((s) => (
              <StatCard
                key={s.id}
                value={s.value}
                label={s.label}
                testID={`stat-${s.id}`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
