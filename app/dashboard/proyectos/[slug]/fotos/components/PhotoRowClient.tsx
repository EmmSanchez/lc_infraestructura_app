"use client";

import Image from "next/image";

interface Photo {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  modifiedAt: string;
  size: string;
}

interface Props {
  photo: Photo;
}

export default function PhotoRowClient({ photo }: Props) {
  const isVideo = /\.(mp4|mov|avi|mkv)$/i.test(photo.name);
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDownload = () => {
    console.log("Download:", photo.name);
    // TODO: implementar descarga
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="p-3">
        <input type="checkbox" aria-label={`Seleccionar ${photo.name}`} />
      </td>
      <td className="p-3">
        <div className="w-12 h-12 relative rounded overflow-hidden bg-gray-100">
          {isVideo ? (
            <span className="material-symbols-outlined text-gray-500 absolute inset-0 flex items-center justify-center">
              movie
            </span>
          ) : photo.thumbnail || photo.url ? (
            <Image
              src={photo.thumbnail || photo.url}
              alt={photo.name}
              fill
              className="object-cover"
            />
          ) : (
            <span className="material-symbols-outlined text-gray-400 absolute inset-0 flex items-center justify-center">
              image
            </span>
          )}
        </div>
      </td>
      <td className="p-3 text-sm text-gray-900">{photo.name}</td>
      <td className="p-3 text-sm text-gray-600">{formatDate(photo.modifiedAt)}</td>
      <td className="p-3 text-sm text-gray-600">{photo.size}</td>
      <td className="p-3">
        <button
          onClick={handleDownload}
          className="p-2 rounded hover:bg-gray-100"
          aria-label="Descargar"
        >
          <span className="material-symbols-outlined text-xl">download</span>
        </button>
      </td>
    </tr>
  );
}
