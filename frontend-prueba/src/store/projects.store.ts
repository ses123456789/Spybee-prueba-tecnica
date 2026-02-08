import { create } from 'zustand';
import { Project } from '@/types/projects';

/* =====================
   SORT TYPE
===================== */

export type SortBy = 'none' | 'alphabetical' | 'incidents' | 'rfi' | 'tasks';
export type SortOrder = 'asc' | 'desc';


/* =====================
   STORE STATE
===================== */

interface ProjectsState {
  projects: Project[];

  page: number;
  search: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
setSortOrder: (order: SortOrder) => void;
toggleSortOrder: () => void;


  selectedProject: Project | null;

  setPage: (page: number) => void;
  setSearch: (value: string) => void;
  setSortBy: (value: SortBy) => void;
  setSelectedProject: (project: Project | null) => void;
}

/* =====================
   STORE
===================== */

export const useProjectsStore = create<ProjectsState>((set) => ({
  projects: [],

  page: 1,
  search: '',
  sortBy: 'none',
  sortOrder: 'asc',


  selectedProject: null,

  setPage: (page) => set({ page }),

  setSearch: (value) =>
    set({
      search: value,
      page: 1,
    }),

  setSortBy: (value) =>
    set({
      sortBy: value,
      page: 1,
    }),
    setSortOrder: (order) => set({ sortOrder: order }),

toggleSortOrder: () =>
  set((state) => ({
    sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc',
  })),

  setSelectedProject: (project) =>
    set({
      selectedProject: project,
    }),
}));
