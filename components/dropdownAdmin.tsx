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
      <div className="relative inline-block text-left">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-[8px] hover:bg-blue-700 transition"
        >
          <span>Agregar</span>
          <Plus className="size-4" />
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
