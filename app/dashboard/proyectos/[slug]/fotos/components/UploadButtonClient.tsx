"use client";

import { Upload } from "lucide-react";

interface Props {
  projectId: string;
}

export default function UploadButtonClient({ projectId }: Props) {
  const handleUpload = () => {
    console.log("Upload for project:", projectId);
    // TODO: implementar lógica de subida
  };

  return (
    <button
      onClick={handleUpload}
      className="flex items-center justify-center gap-3 px-4 py-2 bg-blue-600 text-white rounded-[8px] hover:bg-blue-700"
    >
      <Upload className="size-5" />
      <span>Subir foto</span>
    </button>
  );
}
