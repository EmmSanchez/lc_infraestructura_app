"use client";
import React, { useEffect, useState } from "react";

export default function ContratoModalClient({ open, onClose, initialId }: any) {
  const [idContrato, setIdContrato] = useState(initialId ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);

  useEffect(() => {
    setIdContrato(initialId ?? "");
    setResult(null);
    setError(null);
  }, [initialId, open]);

  if (!open) return null;

  const buscar = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/v1/contratos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idContrato: Number(idContrato) }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Error ${res.status}`);
      }
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Consulta de contrato</h3>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-800"
          >
            Cerrar
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-zinc-600">ID contrato</label>
            <input
              value={idContrato}
              onChange={(e) => setIdContrato(e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2"
              placeholder="Escribe idContrato (ej. 253)"
              type="number"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={buscar}
              disabled={loading || !idContrato}
              className="ml-auto bg-[#3B82F6] text-white px-5 py-2 rounded"
            >
              {loading ? "Buscando..." : "Buscar"}
            </button>
          </div>
        </div>

        {error && <div className="mb-4 text-red-600">{error}</div>}

        {result ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-zinc-500">Importe IVA</div>
              <div className="font-semibold">{result.ImporteIVA ?? "-"}</div>
            </div>
            <div>
              <div className="text-xs text-zinc-500">Total Contrato</div>
              <div className="font-semibold">{result.TotalContrato ?? "-"}</div>
            </div>
            <div>
              <div className="text-xs text-zinc-500">Cliente</div>
              <div className="font-semibold">
                {result.contratoNombreCliente ?? "-"}
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-500">Fecha Contrato</div>
              <div className="font-semibold">
                {result.fechaContratoCliente ?? "-"}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-zinc-500">
            No hay resultados. Introduce un ID y pulsa Buscar.
          </div>
        )}
      </div>
    </div>
  );
}
