import { create } from 'zustand';
export const userSidebar= create((set) => ({
  isMenuactive: false,
  setIsMenuActive: () => set((state) => ({ isMenuactive: !state.isMenuactive })),
}));
