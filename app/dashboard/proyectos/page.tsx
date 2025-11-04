"use client";
import { useProjectStore } from "@/app/stores/useProjectStore";
import { Project } from "@/app/types/Project";
import Image from "next/image";
import Link from "next/link";
import { ambientes } from "@/app/data/projects";

export default function Proyectos() {
  const setProject = useProjectStore((state) => state.setProject);
  const selectProject = (ambiente: Project) => {
    setProject(ambiente);
  };

  return (
    <div className="flex flex-col grow px-10 py-6 mb-20">
      <section className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
        <h2 className="font-semibold text-4xl mb-3">Ambientes</h2>
        <p className="text-xl mb-3">
          Seleccione un ambiente para consultar su información
        </p>

        <div className="flex flex-wrap justify-between w-full max-w-7xl gap-6">
          {ambientes.map((ambiente, id) => {
            return (
              <div
                key={id}
                className="flex flex-col w-full h-fit max-w-[540px] px-7 py-5 gap-2 bg-white rounded-xl border-1 border-zinc-800 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">{ambiente.nombre}</h3>
                  <div className="px-4 py-1.5 bg-[#D1FAE5] rounded-xl">
                    {ambiente.estatus}
                  </div>
                </div>
                <p className="text-lg text-gray-600">{ambiente.resumen}</p>
                <div className="flex flex-row gap-2 items-center">
                  <Image
                    src={"/assets/icons/mapa-de-ubicacion 1.svg"}
                    alt="Icono de mapa"
                    width={50}
                    height={50}
                  />
                  <p className="text-md text-gray-500">{ambiente.municipio}</p>
                </div>
                <Link
                  onClick={() => selectProject(ambiente)}
                  href={`/dashboard/proyectos/${ambiente.slug}/resumen`}
                  className="w-full h-fit px-4 py-2 rounded-xl bg-blue-500 text-white"
                >
                  Seleccionar Ambiente
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
