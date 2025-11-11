"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus } from "lucide-react";

interface User {
  id: string;
  email: string;
  role: string;
}
interface AdminProjectsProps {
  contractID: number;
}

export default function AdminProjects({ contractID }: AdminProjectsProps) {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedEmail, setSelectedEmail] = useState("");

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEmail || !contractID) {
      alert("Por favor selecciona un usuario y un ID de proyecto");
      return;
    }

    // Buscar el usuario en la base de datos por email
    const { data: user, error: userError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", selectedEmail)
      .single();

    if (userError || !user) {
      alert("No se encontró un usuario con ese correo");
      return;
    }

    // Comprobar si ya existe la asignación para evitar duplicados
    try {
      const { data: existing, error: existError } = await supabase
        .from("user_project_assignments")
        .select("id")
        .eq("contract_id", contractID)
        .eq("user_email", selectedEmail)
        .limit(1);

      if (existError) {
        console.error("Error comprobando asignaciones existentes:", existError);
      }

      if (existing && Array.isArray(existing) && existing.length > 0) {
        alert("Este usuario ya está asignado a este proyecto");
        return;
      }
    } catch (err) {
      console.error("Error inesperado comprobando duplicados:", err);
    }

    // Insertar relación en la tabla user_projects
    const { error } = await supabase.from("user_project_assignments").insert([
      {
        contract_id: contractID,
        user_email: selectedEmail,
      },
    ]);

    if (error) {
      alert("Error al asignar proyecto");
      console.error(error);
    } else {
      alert(`Usuario ${selectedEmail} asignado correctamente 🎉`);
      setOpen(false);
      setSelectedEmail("");
      // emitir evento para que la lista en ProjectsList se refresque
      window.dispatchEvent(new CustomEvent("assignmentsChanged"));
    }
  };

  useEffect(() => {
    const getProfiles = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, role")
        .neq("role", "admin"); // <-- AÑADE ESTA LÍNEA

      if (error) console.error("Error al obtener usuarios:", error);
      else setUsers(data);
    };

    getProfiles();
  }, [supabase]);

  return (
    <div>
      {/* Botón para abrir modal */}
      <div className="relative inline-flex text-left items-center gap-2">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-[8px] hover:bg-blue-700 transition"
        >
          <span>Agregar</span>
          <Plus className="size-4" />
        </button>

        {/* Botón rojo para eliminar asignaciones del proyecto */}
        <button
          onClick={async () => {
            const ok = confirm(
              "¿Eliminar todas las asignaciones de usuarios para este proyecto?"
            );
            if (!ok) return;
            try {
              const { error } = await supabase
                .from("user_project_assignments")
                .delete()
                .eq("contract_id", contractID);

              if (error) {
                console.error("Error al eliminar asignaciones:", error);
                alert("Error al eliminar asignaciones");
              } else {
                alert("Asignaciones eliminadas correctamente");
                // emitir evento para que la lista se refresque
                window.dispatchEvent(new CustomEvent("assignmentsChanged"));
              }
            } catch (e) {
              console.error(e);
              alert("Error inesperado al eliminar asignaciones");
            }
          }}
          title="Eliminar asignaciones"
          className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-red-600 text-white hover:bg-red-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"
            />
          </svg>
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-[14px] shadow-lg w-full max-w-md relative text-left">
            <div className="flex flex-col gap-1 mb-6 border-b border-solid border-zinc-200 py-6 px-6">
              <h2 className="text-left text-xl font-semibold">
                Asignar usuario a proyecto
              </h2>
              <p className="font-light text-zinc-500">
                Añade un nuevo miembro al equipo del proyecto
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-6 pb-6">
              {/* Dropdown de usuarios */}
              <div className="pb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Usuario
                </label>
                <select
                  value={selectedEmail}
                  onChange={(e) => setSelectedEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-[6px] px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                  required
                >
                  <option value="">Selecciona un usuario</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.email}>
                      {user.email}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded-[6px] hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-[6px] hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </form>

            {/* Botón para cerrar modal */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
