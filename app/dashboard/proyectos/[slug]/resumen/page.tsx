import StatCard from "@/components/StatCard";

export default function page() {
  return (
    <div className="flex flex-col grow h-full px-10 py-6">
      <section className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
        <h2 className="text-4xl mb-3">Resumen</h2>

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
    </div>
  );
}
