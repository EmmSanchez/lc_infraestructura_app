"use client";
import { useEffect, useState } from "react";
import ContratoCard from "@/components/ContratoCard";
import ContratoModalClient from "@/components/ContratoModalClient";
import contratos from "@/app/data/contratosDatos.json";
import { createClient } from "@/lib/supabase/client";

export default function Proyectos() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalId, setModalId] = useState<number | string | null>(null);
  const [visibleContratos, setVisibleContratos] = useState(contratos);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const init = async () => {
      try {
        const { data: { user } = {} as any } = await supabase.auth.getUser();

        if (!user) {
          setVisibleContratos(contratos);
          setLoading(false);
          return;
        }

        // obtener role desde profiles
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (profileError) console.error("Error obteniendo perfil:", profileError);

        const roleValue = (profile?.role || "").toString();
        const isAdminByRole = roleValue.toLowerCase().includes("admin");
        const isAdminByEmail = (user.email || "").toLowerCase() === "admin@lc.com";
        const isAdmin = isAdminByRole || isAdminByEmail;

        if (isAdmin) {
          setVisibleContratos(contratos);
          setLoading(false);
          return;
        }

        // para usuarios normales, obtener asignaciones y filtrar
        const { data: assignments, error: assignError } = await supabase
          .from("user_project_assignments")
          .select("contract_id")
          .eq("user_email", user.email);

        if (assignError) {
          console.error("Error obteniendo asignaciones:", assignError);
          setVisibleContratos([]);
          setLoading(false);
          return;
        }

        const allowedIds = new Set((assignments || []).map((a: any) => a.contract_id));
        const filtered = contratos.filter((c: any) => allowedIds.has(c.idContrato));
        setVisibleContratos(filtered);
      } catch (e) {
        console.error("Error inicializando proyectos:", e);
        setVisibleContratos([]);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [supabase]);
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

        {loading ? (
          <div className="w-full max-w-7xl mx-auto py-8 text-center text-gray-500">
            Cargando proyectos...
          </div>
        ) : visibleContratos.length === 0 ? (
          <div className="w-full max-w-7xl mx-auto py-12 text-center text-gray-600">
            <p className="text-lg font-medium">No tienes proyectos asignados</p>
            <p className="mt-2 text-sm text-gray-500">Contacta al administrador para que te asigne los proyectos correspondientes.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl gap-6">
            {visibleContratos.map((contrato, id) => {
              return (
                <div key={id}>
                  <ContratoCard contrato={contrato} onOpen={openModal} />
                </div>
              );
            })}
          </div>
        )}
      </section>

      <ContratoModalClient
        open={modalOpen}
        onClose={closeModal}
        initialId={modalId}
      />
    </main>
  );
}
