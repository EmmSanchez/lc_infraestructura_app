"use client";
import { useState } from "react";
import ContratoCard from "@/components/ContratoCard";
import ContratoModalClient from "@/components/ContratoModalClient";
import contratos from "@/app/data/contratosDatos.json";

export default function Proyectos() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalId, setModalId] = useState<number | string | null>(null);

  const openModal = (id?: number | string) => {
    setModalId(id ?? null);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalId(null);
  };

  return (
    <main className="flex flex-col grow bg-gray-50 p-6 md:p-11">
      <section className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-4xl mb-3">Ambientes</h2>
            <p className="text-xl mb-3">
              Seleccione un ambiente para consultar su información
            </p>
          </div>

          {/* Botón azul en la cabecera, a la derecha de 'Ambientes' */}
          <div className="ml-4 flex items-center">
            <button
              onClick={() => openModal()}
              className="px-6 py-3 rounded-full bg-[#3B82F6] text-white font-medium text-lg shadow hover:bg-[#3B82F6]/90"
            >
              Consultar ambiente
            </button>
          </div>
        </div>

        <div className="border-t border-zinc-200 w-full" />

        <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl gap-6">
          {contratos.map((contrato, id) => {
            return (
              <div key={id}>
                <ContratoCard contrato={contrato} onOpen={openModal} />
              </div>
            );
          })}
        </div>
      </section>

      <ContratoModalClient
        open={modalOpen}
        onClose={closeModal}
        initialId={modalId}
      />
    </main>
  );
}
