"use client";
import { useProjectStore } from "@/app/stores/useProjectStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import contratos from "@/app/data/contratosDatos.json";
import { Project } from "@/app/types/Project";
import { Contrato } from "@/app/types/Contrato";

const sidebarLinks = [
  {
    nombre: "Resumen",
    href: "resumen",
  },
  {
    nombre: "Contratos",
    href: "contratos",
  },
  {
    nombre: "Fotos",
    href: "fotos",
  },
  {
    nombre: "Documentos",
    href: "documentos",
  },
];

export default function Sidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { currentProject, setProject } = useProjectStore();

  const parts = pathname.split("/");
  const slugID = parts[3];

  useEffect(() => {
    if (!currentProject && slugID) {
      const result: Contrato | undefined = contratos.find(
        (contrato) => contrato.idContrato.toString() === slugID
      );
      if (result) {
        setProject(result);
      } else {
        console.warn(`No se encontró el proyecto con slug: ${slugID}`);
      }
    }
  }, [slugID, currentProject, setProject]);

  return (
    <div className="flex grow">
      <div className="flex flex-col grow items-center gap-6 w-full max-w-[280px] px-5 py-10 border-r-[1px] border-r-gray-500">
        {sidebarLinks.map((link, index) => {
          return (
            <Link
              key={index}
              href={`/dashboard/proyectos/${currentProject?.idContrato}/${link.href}`}
              className={`w-full text-center py-3 rounded-[8px] transition-colors ease-in-out ${
                pathname.endsWith(link.href)
                  ? "bg-[#2563EB] text-white"
                  : "hover:bg-[#2563EB] hover:text-white"
              }`}
            >
              {link.nombre}
            </Link>
          );
        })}
      </div>
      <div className="flex-1 overflow-auto grow">{children}</div>
    </div>
  );
}
