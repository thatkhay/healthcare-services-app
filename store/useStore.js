import { create } from "zustand";

export const useStore = create((set) => ({
  selectedService: null,
  servicesPage: 1,
  concernsPage: 1,
  perPage: 20,

  setSelectedService: (service) => set({ selectedService: service }),
  setServicesPage: (page) => set({ servicesPage: page }),
  setConcernsPage: (page) => set({ concernsPage: page }),
  resetPagination: () => set({ servicesPage: 1, concernsPage: 1 }),
}));
