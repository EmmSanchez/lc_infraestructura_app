import StatCard from "@/components/StatCard";

const contratosProyecto = [
  {
    contrato: "Instalación eléctrica",
    monto: "$1,500,000",
    progreso: 80,
    estatus: "Activo",
  },
  {
    contrato: "Urbanización",
    monto: "$4,000,000",
    progreso: 40,
    estatus: "Activo",
  },
];

export default function page() {
  return (
    <div className="flex flex-col grow px-10 py-6 gap-14">
      <section className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
        <h2 className="text-4xl mb-3">Contratos</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6">
          <StatCard
            value={4}
            label="Contratos Totales"
            key={"contratos-totales"}
          />
          <StatCard
            value={"$11,500,000"}
            label="Valor Total"
            key={"valor-total"}
          />
          <StatCard
            value={"65%"}
            label="Progreso Total"
            key={"progreso-total"}
          />
        </div>
      </section>
      <section className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
        <h2 className="text-3xl mb-3">Contratos del Proyecto</h2>

        <div className="flex flex-col">
          <div className="flex flex-wrap justify-between w-full max-w-7xl gap-6">
            {contratosProyecto.map((contrato, id) => {
              return (
                <div
                  key={id}
                  className="flex flex-col w-full h-fit px-7 py-5 gap-4 bg-white rounded-xl border-1 border-zinc-300 shadow-xs"
                >
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <h3 className="text-2xl font-bold">
                        {contrato.contrato}
                      </h3>
                      <div className="px-4 py-1.5 bg-[#D1FAE5] rounded-md">
                        {contrato.estatus}
                      </div>
                    </div>
                    <p className="text-lg text-gray-600">{contrato.monto}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-lg font-bold text-gray-700">Progreso</p>
                    <div className="relative h-3">
                      <div className="absolute w-full h-3 bg-[#E3E3E3] rounded-full"></div>
                      <div
                        className={`absolute h-3 bg-[#2563EB] rounded-full`}
                        style={{ width: `${contrato.progreso}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
