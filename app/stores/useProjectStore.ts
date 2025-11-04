import { create } from "zustand";
import { Project } from "../types/Project";

interface ProjectState {
  currentProject: Project | null;
  setProject: (project: Project | null) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  currentProject: null,
  setProject: (project) => set({ currentProject: project }),
}));
