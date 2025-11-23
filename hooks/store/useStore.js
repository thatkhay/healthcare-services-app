
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      // Service selection
      selectedService: null,
      setSelectedService: (service) => set({ selectedService: service }),

      // Pagination
      servicesPage: 1,
      concernsPage: 1,
      perPage: 20,
      setServicesPage: (page) => set({ servicesPage: page }),
      setConcernsPage: (page) => set({ concernsPage: page }),
      resetPagination: () => set({ servicesPage: 1, concernsPage: 1 }),

      // Auth
      token: null,
      user: null,
      isAuthenticated: false,

      setAuth: (token, user) =>
        set({
          token,
          user,
          isAuthenticated: !!token,
        }),

      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          selectedService: null,
          servicesPage: 1,
          concernsPage: 1,
          providers: [],
        }),

      // Providers
      providers: [],
      providersLoading: false,
      setProviders: (providers) => set({ providers }),
      setProvidersLoading: (loading) => set({ providersLoading: loading }),

      // Role checks
      hasRole: (role) => {
        const state = get();
        return state.user?.role === role || state.user?.roles?.includes(role);
      },

      isAdmin: () => {
        const state = get();
        return state.user?.role === "admin" || state.user?.isAdmin === true;
      },
    }),
    {
      name: "wellchild_auth",
      storage: createJSONStorage(() => localStorage),
      // Only persist auth-related data
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
