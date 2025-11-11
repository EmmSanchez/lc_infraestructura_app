import { ProjectsList } from "@/components/ProjectsList";

export default function page() {
  return (
    <main className="flex flex-col grow bg-gray-50 p-6 md:p-11">
      <section
        aria-labelledby="welcome-title"
        className="w-full max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div className="w-full flex flex-col gap-6">
            <h2
              id="welcome-title"
              className="text-3xl md:text-4xl font-bold text-gray-900"
            >
              Administrador de Proyectos
            </h2>
            <p className="text-sm text-gray-500 mt-2"></p>

            <div className="w-full rounded-[10px] border-solid border-[1px] overflow-hidden">
              <ProjectsList />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
