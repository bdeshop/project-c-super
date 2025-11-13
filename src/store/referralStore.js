import { create } from "zustand";
import { persist } from "zustand/middleware";

const useReferralStore = create(
  persist(
    (set, get) => ({
      referralData: null,
      loading: false,
      error: null,

      // Set referral data from login response
      setReferralDataFromLogin: (loginData) => {
        if (loginData && loginData.user) {
          const referralData = {
            referralCode: loginData.user.referralCode,
            shareUrl:
              loginData.user.shareUrl ||
              `${window.location.origin}/signup?ref=${loginData.user.referralCode}`,
            referralEarnings: loginData.user.referralEarnings || 0,
            totalReferrals: loginData.user.totalReferrals || 0,
          };
          console.log("✅ Setting referral data from login:", referralData);
          set({ referralData, loading: false, error: null });
        }
      },

      // Set referral data (legacy method)
      setReferralData: (data) => set({ referralData: data }),

      // Set loading state
      setLoading: (loading) => set({ loading }),

      // Set error state
      setError: (error) => set({ error }),

      // Clear referral data (call this on logout)
      clearReferralData: () => {
        console.log("🗑️ Clearing referral data");
        set({ referralData: null, loading: false, error: null });
      },

      // Get referral data
      getReferralData: () => get().referralData,
    }),
    {
      name: "referral-storage", // name of the item in localStorage
      partialize: (state) => ({
        referralData: state.referralData,
      }),
    }
  )
);

export default useReferralStore;
