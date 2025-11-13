/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      boxShadow: {
        '3xl-blue': '0 10px 20px rgba(59, 130, 246, 0.9)',
        'exchange-shadow': 'inset 5px 5px 10px rgba(20, 128, 94, 0.7)', 
      },
      colors: { 
        
        "textPrimary":"#0abab4",
        "textSecondary":"#959595",
        'table-gray':'#b9b9b9',
        'exchange-color': 'rgba(6, 12, 6, 0.5)',
        'jaya-bg-color' : '#00514e',
        'whatsappcolor':'#4caf50',
        // 'uttoloncolor':'#514bbe',
        'memberinfotextcolor':'#0abab4',
        "footer-textSecondary":"#959595",
        
        
      },
      backgroundColor:{
        'common-orange': '#0abab4',
        'common-blue' : '#0abab4',
        'jaya-9-color':'#467dc6',
        'bg-jaya9-logo-color' : '#303030',
        "bg-primary":"#00514e",
        "bg-Secondary":"#262626",
        "bg-SecondaryTwo":"#001d1d",
       "homeImageTabColor":"#e0fcfc",
        memberProfileColor: "#d4ffff",
        informationBackground: "#d5d5d5",
        toolbarbackground: "#9584ff",
        'homeTabColor':'#EAEAEA',
        'custom-orange': "#0abab4",



        
      },
      backgroundImage: {
        "ReferralButtonColor":"linear-gradient(to_right,#0abab4,transparent)",
        "vipBg":"transparent radial-gradient(closest-side at 62% 18%,#002927 0,#001a19 100%)",
        "special-Color": "linear-gradient(180deg, #5d5d5d, #1d1d1d)"
        
      },
    },
  },
  plugins: [],
}

