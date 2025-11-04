"use client";

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
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      <span className="material-symbols-outlined text-xl">upload</span>
      <span>Subir foto</span>
    </button>
  );
}
