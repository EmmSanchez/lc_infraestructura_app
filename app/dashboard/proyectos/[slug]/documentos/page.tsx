import { Download } from "lucide-react";

const documentos = [
  {
    nombre: "Contrato de obra",
    fecha: "Hace 5 días",
  },
  {
    nombre: "Plano estructural",
    fecha: "Hace 1 mes",
  },
  {
    nombre: "Estudio topográfico",
    fecha: "Hace 2 meses",
  },
];

export default function DocumentosPage() {
  return (
    <div className="flex flex-col grow px-10 py-6">
      <section className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
        <h2 className="text-4xl mb-3">Documentos</h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {documentos.map((doc, index) => (
            <div
              key={index}
              className="flex h-[84px] w-full items-center gap-4 rounded-lg border border-solid border-[#E6E6E6] bg-white p-4 shadow-sm transition-shadow hover:shadow-md max-w-[320px]"
            >
              <div className="flex flex-1 flex-col justify-center overflow-hidden">
                <p className="truncate text-base font-semibold text-[#111827]">
                  {doc.nombre}
                </p>
                <p className="truncate text-xs font-normal text-[#6B7280]">
                  {doc.fecha}
                </p>
              </div>
              <div className="shrink-0">
                <button className="flex size-9 items-center justify-center rounded-md border border-solid border-[#E6E6E6] bg-white text-[#111827] hover:bg-gray-50">
                  <Download />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
