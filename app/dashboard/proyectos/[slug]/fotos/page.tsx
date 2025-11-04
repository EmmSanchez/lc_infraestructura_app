"use client";
import ViewControlsClient from "./components/ViewControlsClient";
import UploadButtonClient from "./components/UploadButtonClient";
import PhotoRowClient from "./components/PhotoRowClient";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";

const photos = [
  {
    id: "p1",
    name: "IMG_20231026_1034_cimentacion.png",
    url: "/assets/photos/IMG_20231026_1034_cimentacion.png",
    thumbnail: "/assets/photos/IMG_20231026_1034_cimentacion.png",
    modifiedAt: "2023-10-26T09:12:00Z",
    size: "4.2 MB",
  },
  {
    id: "p2",
    name: "ACERO_ESTRUCTURAL_FASE1.jpeg",
    url: "/assets/photos/ACERO_ESTRUCTURAL_FASE1.jpeg",
    thumbnail: "/assets/photos/ACERO_ESTRUCTURAL_FASE1.jpeg",
    modifiedAt: "2023-10-25T11:00:00Z",
    size: "3.1 MB",
  },
  {
    id: "p3",
    name: "VISTA_PANORAMICA_PUENTE.jpg",
    url: "/assets/photos/VISTA_PANORAMICA_PUENTE.jpg",
    thumbnail: "/assets/photos/VISTA_PANORAMICA_PUENTE.jpg",
    modifiedAt: "2023-10-24T10:00:00Z",
    size: "8.5 MB",
  },
  {
    id: "p4",
    name: "HORMIGONADO_PILAR_CENTRAL.mov",
    url: "/assets/photos/HORMIGONADO_PILAR_CENTRAL.mov",
    thumbnail: "",
    modifiedAt: "2023-10-23T08:30:00Z",
    size: "25.7 MB",
  },
  {
    id: "p5",
    name: "ACABADO_SUPERFICIE_VIAL.jpg",
    url: "/assets/photos/ACABADO_SUPERFICIE_VIAL.jpg",
    thumbnail: "/assets/photos/ACABADO_SUPERFICIE_VIAL.jpg",
    modifiedAt: "2023-10-22T14:20:00Z",
    size: "5.0 MB",
  },
];

export default function Page() {
  const searchParams = useSearchParams();
  const params = useParams();
  const { slug } = params;

  const view = searchParams.get("view") === "grid" ? "grid" : "list";

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const isVideo = (name: string) => /\.(mp4|mov|avi|mkv)$/i.test(name);
  return (
    <div className="flex flex-col grow px-12 py-8">
      <section className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
        <h2 className="text-4xl mb-3">Fotos</h2>

        <div className="flex items-center justify-between mb-4">
          <ViewControlsClient />
          <UploadButtonClient projectId={slug!.toString()} />
        </div>

        {view === "list" ? (
          <div className="overflow-hidden border border-gray-200 rounded-[10px]">
            <table className="w-full table-fixed">
              <thead className="bg-gray-50">
                <tr className="text-left text-sm text-gray-600">
                  <th className="w-12 p-3">
                    <input aria-label="Seleccionar todo" type="checkbox" />
                  </th>
                  <th className="w-16 p-3">Vista previa</th>
                  <th className="p-3">Nombre</th>
                  <th className="p-3">Fecha de modificación</th>
                  <th className="w-24 p-3">Tamaño</th>
                  <th className="w-20 p-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {photos.map((p) => (
                  <PhotoRowClient key={p.id} photo={p} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((p) => (
              <div
                key={p.id}
                className="group rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-md bg-gray-100">
                  {isVideo(p.name) ? (
                    <span className="material-symbols-outlined text-gray-500 absolute inset-0 flex items-center justify-center text-5xl">
                      movie
                    </span>
                  ) : (
                    <Image
                      src={p.thumbnail || p.url}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  )}
                </div>
                <div className="mt-2">
                  <p
                    className="text-sm font-medium text-gray-900 truncate"
                    title={p.name}
                  >
                    {p.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {formatDate(p.modifiedAt)} • {p.size}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
