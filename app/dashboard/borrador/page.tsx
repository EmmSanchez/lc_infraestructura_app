"use client";
import contratos from "@/app/data/contratosDatos.json";
import { useProjectStore } from "@/app/stores/useProjectStore";
import ContratoCard from "@/components/ContratoCard";
import { Calendar, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Borrador() {
  const setProject = useProjectStore((state) => state.setProject);
  // const selectProject = (ambiente) => {
  //   setProject(ambiente);
  // };
  return (
    <main className="flex flex-col grow bg-gray-50 p-6 md:p-11">
      <section className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
        <h2 className="font-semibold text-4xl mb-3">Ambientes</h2>
        <p className="text-xl mb-3">
          Seleccione un ambiente para consultar su información
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl gap-6">
          {contratos.map((contrato, id) => {
            return (
              <div key={id}>
                <ContratoCard contrato={contrato} />
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
