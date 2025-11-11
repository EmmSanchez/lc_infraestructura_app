"use client";
import { useProjectStore } from "@/app/stores/useProjectStore";
import StatCard from "@/components/StatCard";
import estimaciones from "@/app/data/estimacionesDatos.json";
import { useMemo } from "react";
import { formatCurrency } from "@/app/utils/formatCurrency";

export default function page() {
  const currentProject = useProjectStore((state) => state.currentProject);

  const data = estimaciones.filter(
    (estimacion) => estimacion.idContrato === currentProject?.idContrato
  );

  const valorAcumulado = useMemo(() => {
    return data.reduce((acumulador, estimacion) => {
      return acumulador + estimacion.total;
    }, 0);
  }, [data]);

  return (
    <div className="flex flex-col grow h-full px-10 py-6">
      <section className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
        <h2 className="text-4xl mb-3">Resumen</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6">
          <StatCard
            value={data.length}
            label="Contratos Totales"
            key={"contratos-totales"}
          />
          <StatCard
            value={formatCurrency(valorAcumulado)}
            label="Valor Total"
            key={"valor-total"}
          />
          <StatCard
            value={currentProject?.Avance.toString() || "Desconocido"}
            label="Progreso Total"
            key={"progreso-total"}
          />
        </div>
      </section>
    </div>
  );
}
