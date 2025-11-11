import { Calendar, DollarSign, TrendingUp } from "lucide-react";
import React from "react";

export default function ContratoCard({ contrato, onOpen }: any) {
  const nombre = contrato.Contrato.split(" - ")[1] || contrato.Contrato;
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "abiertos":
        return "bg-green-500/10 text-green-900 border-green-200";
      case "cerrados":
        return "bg-yellow-500/10 text-yellow-900 border-yellow-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };
  const progressValue = Number.parseFloat(contrato.Avance);
  return (
    <div className="flex flex-col w-full h-full max-w-[620px] px-7 py-5 gap-10 bg-white rounded-xl border-[1px] border-zinc-200 shadow-md">
      {/* Card Header */}
      <div className="flex items-start justify-between gap-2 grow">
        <div className="flex-1">
          <h3 className="text-xl font-semibold line-clamp-2 text-foreground">
            {nombre}
          </h3>
          <p className="text-md font-light text-zinc-500 mt-1">
            <span>Contrato #</span>
            {contrato.idContrato}
          </p>
        </div>
        <p
          className={`border-solid border-[1px] rounded-[8px] px-3 py-1 ${getStatusColor(
            contrato.Estado
          )} whitespace-nowrap`}
        >
          {contrato.Estado}
        </p>
      </div>

      {/* Card Body */}
      <div className="space-y-4">
        {/* Progreso */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-base font-medium flex items-center gap-2 text-zinc-600">
              <TrendingUp className="size-6" />
              Avance
            </span>
            <span className="text-base font-bold text-primary">
              {contrato.Avance}
            </span>
          </div>
          {/* Progreso */}
          <div className="relative h-3">
            <div className="absolute w-full h-3 bg-[#E3E3E3] rounded-full"></div>
            <div
              className={`absolute h-3 bg-gradient-to-r from-[#2563EB] to-blue-400 rounded-full`}
              style={{ width: `${progressValue}%` }}
            ></div>
          </div>
        </div>

        {/* Grid de datos financieros */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-100/70 rounded-[10px] p-2.5 border-solid border-[1px] border-zinc-200/50">
            <p className="text-base font-light mb-2 flex items-center gap-1">
              <DollarSign className="size-4" />
              Total
            </p>
            <p className="font-bold text-base text-zinc-800">
              {contrato.Total}
            </p>
          </div>

          <div className="bg-zinc-100/70 rounded-[10px] p-2.5 border-solid border-[1px] border-zinc-200/50">
            <p className="text-base font-light mb-2">Presupuesto</p>
            <p className="font-bold text-base text-zinc-800">
              {contrato.Importe}
            </p>
          </div>

          <div className="bg-zinc-100/70 rounded-[10px] p-2.5 border-solid border-[1px] border-zinc-200/50">
            <p className="text-base font-light mb-2">IVA</p>
            <p className="font-bold text-base text-zinc-800">{contrato.IVA}</p>
          </div>

          <div className="bg-zinc-100/70 rounded-[10px] p-2.5 border-solid border-[1px] border-zinc-200/50">
            <p className="text-base font-light mb-2 flex items-center gap-1">
              <Calendar className="size-4" />
              Fecha
            </p>
            <p className="font-bold text-base text-zinc-800">
              {contrato.Fecha}
            </p>
          </div>
        </div>
      </div>
      {/* Footer con CTA */}
      <button
        onClick={() => onOpen?.(contrato.idContrato)}
        className="w-full px-3 py-2 rounded-[8px] bg-[#3B82F6] text-white font-medium text-lg hover:bg-[#3B82F6]/90 transition-colors"
      >
        Ver detalles
      </button>
    </div>
  );
}
