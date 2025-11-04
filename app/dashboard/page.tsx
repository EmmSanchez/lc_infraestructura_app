"use client";
import ActionCard from "@/components/ActionCard";
import StatCard from "@/components/StatCard";

const actionCards = [
  {
    id: "participacion",
    title: "Proyectos en participacion",
    href: "/dashboard/proyectos/participacion",
    icon: "group" as const,
  },
  {
    id: "proyectos",
    title: "Proyectos",
    href: "/dashboard/proyectos",
    icon: "person" as const,
  },
];

const stats = [
  { id: "pactivos", value: 24, label: "Proyectos Activos" },
  { id: "documentos", value: 156, label: "Documentos" },
  { id: "contratos", value: 8, label: "Contratos en uso" },
];

export default function Page() {
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

        {/* Action cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {actionCards.map((c) => (
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
