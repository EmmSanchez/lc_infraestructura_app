"use client";
import DataTable, { TableStyles } from "react-data-table-component";
import estimaciones from "@/app/data/estimacionesDatos.json";
import estimacionesConfiguracion from "@/app/data/estimacionesConfiguracionColumnas.json";
import { useMemo } from "react";
import { formatDate } from "@/app/utils/formatDate";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { useProjectStore } from "@/app/stores/useProjectStore";
const customStyles: TableStyles = {
  table: {
    style: {
      backgroundColor: "transparent",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#F8FAFC", // slate-50
      borderBottomWidth: "1px",
      borderBottomColor: "#E2E8F0", // slate-200
    },
  },
  headCells: {
    style: {
      color: "#475569", // slate-600
      fontWeight: 600,
      fontSize: "13px",
      textTransform: "uppercase",
      letterSpacing: "0.02em",
      padding: "4px 10px",
    },
  },
  rows: {
    style: {
      minHeight: "52px",
      borderBottomColor: "#F1F5F9", // slate-100
      "&:hover": {
        backgroundColor: "#F9FAFB", // hover suave
        transition: "background-color 0.2s ease",
      },
    },
  },
  cells: {
    style: {
      padding: "4px 10px",
      fontSize: "14px",
      color: "#1E293B", // slate-800
    },
  },
  pagination: {
    style: {
      backgroundColor: "white",
      borderTop: "1px solid #E2E8F0",
      color: "#475569",
    },
    pageButtonsStyle: {
      height: "32px",
      width: "32px",
      padding: "6px",
      margin: "0 4px",
      color: "#475569",
      fill: "#475569",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "#E2E8F0",
      },
      "&:disabled": {
        opacity: 0.4,
      },
    },
  },
};

export default function page() {
  const columns = useMemo(() => {
    const visibleColumnsConfig = estimacionesConfiguracion.filter(
      (col) => !col.PropiedadesColumna.EstaOculta && col.TipoColumna !== "Icono"
    );

    return visibleColumnsConfig.map((col) => {
      let selectorField = col.NombreColumna;

      if (col.NombreColumna === "Estimacion") {
        selectorField = "nombre";
      }

      return {
        name: col.NombreMostrar || col.NombreColumna,
        selector: (row: { [x: string]: any }) => row[selectorField],
        sortable: true,
        format: (row: { [x: string]: any }) => {
          const value = row[selectorField];
          if (col.PropiedadesColumna.Formato === "Dinero") {
            return formatCurrency(value);
          }
          if (col.PropiedadesColumna.Formato === "FechaCorta") {
            return formatDate(value);
          }
          return value;
        },
      };
    });
  }, []);
  const currentProject = useProjectStore((state) => state.currentProject);

  const data = estimaciones.filter(
    (estimacion) => estimacion.idContrato === currentProject?.idContrato
  );
  return (
    <div className="flex flex-col grow px-10 py-6 gap-14">
      <section className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
        <h2 className="text-4xl mb-3">Estimaciones</h2>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <DataTable
            data={data}
            columns={columns}
            customStyles={customStyles}
            pagination
            highlightOnHover
          />
        </div>
      </section>
    </div>
  );
}
