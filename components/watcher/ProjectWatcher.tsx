"use client";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUserStore } from "@/app/stores/useUserStore";
import { useProjectStore } from "@/app/stores/useProjectStore";
import contratos from "@/app/data/contratosDatos.json";

export function ProjectsWatcher() {
  const supabase = createClient();
  const user = useUserStore((state) => state.user);
  const setListOfAssignedProjects = useProjectStore(
    (state) => state.setListOfAssignedProjects
  );
  const setListOfProjectsId = useProjectStore(
    (state) => state.setListOfProjectsId
  );

  useEffect(() => {
    if (!user?.email) return;

    const loadProjectsData = async () => {
      try {
        // 1️⃣ Obtener rol del usuario
        const { data: roleData, error: roleError } = await supabase
          .from("profiles")
          .select("role")
          .eq("email", user.email)
          .single();

        if (roleError) console.error("Error al obtener rol:", roleError);

        if (roleData?.role === "user") {
          // 2️⃣ Obtener contratos asignados
          const { data: assignedContracts, error: contractsError } =
            await supabase
              .from("user_project_assignments")
              .select("contract_id")
              .eq("user_email", user.email);

          if (contractsError) {
            console.error(
              "Error al obtener contratos del usuario:",
              contractsError
            );
            return;
          }

          // Guardar lista de IDs
          setListOfProjectsId(assignedContracts || []);

          // 3️⃣ Filtrar contratos según IDs asignados
          const setOfIDs = new Set(
            (assignedContracts || []).map((item) => item.contract_id.toString())
          );

          const filteredContracts = contratos.filter((contrato) =>
            setOfIDs.has(contrato.idContrato.toString())
          );

          setListOfAssignedProjects(filteredContracts);
        }

        if (roleData?.role === "admin") {
          setListOfAssignedProjects(contratos);
        }
      } catch (err) {
        console.error("Error general:", err);
      }
    };

    loadProjectsData();
  }, [user]);

  return null;
}
