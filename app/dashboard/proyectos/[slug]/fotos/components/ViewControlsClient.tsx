"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ViewControlsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") === "grid" ? "grid" : "list";

  const setView = (view: "grid" | "list") => {
    const params = new URLSearchParams(searchParams.toString());
    if (view === "list") params.delete("view"); // list como default limpio
    else params.set("view", view);
    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const baseBtn = "p-2 rounded hover:bg-gray-100 border border-transparent";
  const activeBtn = "border-gray-300 bg-gray-50";

  return (
    <div className="flex items-center gap-2">
      <button
        className={`${baseBtn} ${currentView === "grid" ? activeBtn : ""}`}
        aria-pressed={currentView === "grid"}
        onClick={() => setView("grid")}
        title="Vista de cuadrícula"
      >
        <span className="material-symbols-outlined text-xl">grid_view</span>
      </button>
      <button
        className={`${baseBtn} ${currentView === "list" ? activeBtn : ""}`}
        aria-pressed={currentView === "list"}
        onClick={() => setView("list")}
        title="Vista de lista"
      >
        <span className="material-symbols-outlined text-xl">view_list</span>
      </button>
    </div>
  );
}
