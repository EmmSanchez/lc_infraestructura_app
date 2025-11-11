"use client";

import contratos from "@/app/data/contratosDatos.json";
import DropdownAdmin from "./dropdownAdmin";
import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";

interface UserAssignment {
  user_email: string;
  contract_id: string;
}

function StatusBadge({ status }: { status: "Abiertos" | "Cerrados" }) {
  const statusConfig = {
    Abiertos: {
      bg: "bg-emerald-100 dark:bg-emerald-900/40",
      text: "text-emerald-700 dark:text-emerald-300",
      label: "Abierto",
    },
    Cerrados: {
      bg: "bg-slate-100 dark:bg-slate-800",
      text: "text-slate-700 dark:text-slate-300",
      label: "Cerrado",
    },
  };

  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}

function getRandomColor(email: string) {
  // genera un color consistente basado en el email
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-pink-500",
    "bg-orange-500",
    "bg-purple-500",
    "bg-yellow-500",
    "bg-rose-500",
  ];
  const index =
    email.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;
  return colors[index];
}

function StackedAvatars({ emails }: { emails: string[] }) {
  const displayEmails = emails.slice(0, 3);
  const moreCount = Math.max(0, emails.length - 3);

  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {displayEmails.map((email, i) => {
          const color = getRandomColor(email);
          return (
            <div
              key={i}
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white dark:border-slate-900 text-white text-sm font-semibold ${color}`}
              title={email}
            >
              {email.charAt(0).toUpperCase()}
            </div>
          );
        })}
        {moreCount > 0 && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white dark:border-slate-900 bg-gray-200 text-gray-700 text-xs font-semibold">
            +{moreCount}
          </div>
        )}
      </div>
    </div>
  );
}

export function ProjectsList() {
  const [assignments, setAssignments] = useState<UserAssignment[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchAssignments = async () => {
      const { data, error } = await supabase
        .from("user_project_assignments")
        .select("user_email, contract_id");

      if (error) console.error("Error al obtener asignaciones:", error);
      else setAssignments(data || []);
    };

    fetchAssignments();
  }, [supabase]);

  // Agrupar usuarios por contract_id
  const groupedAssignments = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const a of assignments) {
      if (!map[a.contract_id]) map[a.contract_id] = [];
      map[a.contract_id].push(a.user_email);
    }
    return map;
  }, [assignments]);

  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-blue-200/50">
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Nombre del Proyecto
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Estado
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Fecha</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Usuarios Asignados
            </th>
            <th className="px-6 py-4 text-right text-sm font-semibold">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {contratos.map((contrato, index) => {
            const nombre =
              contrato.Contrato.split(" - ")[1] || contrato.Contrato;

            const assignedUsers = groupedAssignments[contrato.idContrato] || [];

            return (
              <tr
                key={index}
                className="border-b border-zinc-300 hover:bg-zinc-300/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold">{nombre}</p>
                    <p className="text-sm font-light">#{contrato.idContrato}</p>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <StatusBadge
                    status={contrato.Estado as "Cerrados" | "Abiertos"}
                  />
                </td>

                <td className="px-6 py-4 text-sm">{contrato.Fecha}</td>

                <td className="px-6 py-4">
                  {assignedUsers.length > 0 ? (
                    <StackedAvatars emails={assignedUsers} />
                  ) : (
                    <span className="text-sm text-gray-400 italic">
                      Sin usuarios
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-right">
                  <DropdownAdmin contractID={contrato.idContrato} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
