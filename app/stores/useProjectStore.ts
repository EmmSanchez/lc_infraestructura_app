import { create } from "zustand";
import { Contrato } from "../types/Contrato";

interface ProjectState {
  currentProject: Contrato | null;
  setProject: (project: Contrato | null) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  currentProject: null,
  setProject: (project) => set({ currentProject: project }),
}));
