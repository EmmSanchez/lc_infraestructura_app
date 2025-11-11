import { create } from "zustand";
import { Contrato } from "../types/Contrato";

interface ProjectState {
  listOfProjectsId: { contract_id: string }[] | null;
  setListOfProjectsId: (id: { contract_id: string }[] | null) => void;
  currentProject: Contrato | null;
  setProject: (project: Contrato | null) => void;
  listOfAssignedProjects: Contrato[] | null;
  setListOfAssignedProjects: (project: Contrato[] | null) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  listOfProjectsId: [],
  setListOfProjectsId: (IDs) => set({ listOfProjectsId: IDs }),
  currentProject: null,
  setProject: (project) => set({ currentProject: project }),
  listOfAssignedProjects: [],
  setListOfAssignedProjects: (projects) =>
    set({ listOfAssignedProjects: projects }),
}));
