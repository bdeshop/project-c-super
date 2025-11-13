import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { applyThemeColors } from '../utils/settings';

const useSiteSettingsStore = create(
  persist(
    (set, get) => ({
      siteSettings: null,
      setSiteSettings: (settings) => {
        set({ siteSettings: settings });
        // Apply theme colors when settings are updated
        if (settings) {
          applyThemeColors(settings);
        }
      },
      getSiteSettings: () => get().siteSettings,
    }),
    {
      name: 'site-settings-storage', // name of the item in the storage (must be unique)
      partialize: (state) => ({ siteSettings: state.siteSettings }), // only store siteSettings
    }
  )
);

export default useSiteSettingsStore;