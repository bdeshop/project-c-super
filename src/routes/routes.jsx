import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home';
import Cricket from '../Pages/Cricket';
import LiveCasino from '../Pages/LiveCasino';
import SlotGames from '../Pages/SlotGames';
import TableGames from '../Pages/TableGames';
import Sports from '../Pages/Sports';
import Fishing from '../Pages/Fishing';
import Lottery from '../Pages/Lottery';
import Crash from '../Pages/Crash';
import Promotion from '../Pages/Promotion';
import Jayatable from '../Pages/JayaTable';
import Deposit from '../Pages/Deposit';
import VerifyProfile from '../Pages/VerifyProfile';
import MainLayout from '../Layout/MainLayout';
import MainProfile from '../Pages/MainProfile';
import Baji from '../Pages/Baji';
import Turnover from '../Pages/Turnover';
import TransferRecord from '../Pages/TransferRecord';
import Bonus from '../Pages/Bonus';
import Transaction from '../Pages/Transaction';
import PasswordChange from '../Pages/PasswordChange';
import BankDetails from '../Pages/BankDetails';
import Inbox from '../Pages/Inbox';
import Referral from '../Pages/Referral'; // Uncommented Referral import
import ReferralBonus from '../Pages/ReferralBonus'; // Uncommented ReferralBonus import
import SidebarTabs from '../Pages/SidebarTabs';
import SignUp from '../Pages/SignUp';
import ReferralSummary from '../Pages/ReferralSummary';
import Vip from '../Pages/Vip';
import Affiliate from '../Pages/Affiliate';
import InstantRebate from '../Pages/InstantRebate';
import Voucher from '../Pages/Voucher';
import Reward from '../Pages/Reward';
import ReferralCode from '../Pages/ReferralCode'; // Added ReferralCode import
import ErrorBoundary from '../components/ErrorBoundary'; // Added ErrorBoundary import

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      
      
      {
        path: '/',
        element: <Home />,
        loader: async () => {
          await new Promise(resolve => setTimeout(resolve, 2000)); // delay for 2 sec
          return null;
        }
      },
      { path: '/cricket', element: <Cricket /> },
      { path: '/livecasino', element: <LiveCasino /> },
      { path: '/slotgames', element: <SlotGames /> },
      { path: '/tablegames', element: <TableGames /> },
      { path: '/sports', element: <Sports /> },
      { path: '/machdhora', element: <Fishing /> },
      { path: '/lottery', element: <Lottery /> },
      { path: '/crash', element: <Crash /> },
      { path: '/promotion', element: <Promotion /> },
      { path: '/jayarank', element: <Jayatable /> },
      { path: '/vip', element: <Vip /> },
      { path: '/nibondon', element: <SignUp /> },

      
      
      { path: '/amanot', element: <Deposit /> },
      { path: '/instantRebate', element: <InstantRebate /> },
      { path: '/voucher', element: <Voucher /> },
      { path: '/jachaikoron', element: <VerifyProfile /> },
      { path: '/baji', element: <Baji /> },
      { path: '/turnover', element: <Turnover /> },
      { path: '/sthanantor', element: <TransferRecord /> },
      { path: '/bonus', element: <Bonus /> },
      { path: '/lenden', element: <Transaction /> },
      { path: '/dabivoutcher', element: <Voucher /> },
      { path: '/puroskar', element: <Reward /> },
      { path: '/passwordchange', element: <PasswordChange /> },
      { path: '/bankdetails', element: <BankDetails /> },
      { path: '/inbox', element: <Inbox /> },
      { path: '/refference', element: <MainProfile><Referral /></MainProfile> }, // Render Referral as child of MainProfile
      { path: '/refferelbonus', element: <ErrorBoundary><ReferralBonus /></ErrorBoundary> }, // Uncommented and wrapped with ErrorBoundary
      { path: '/referralsummary', element: <ReferralSummary /> },
      { path: '/referralcode', element: <ErrorBoundary><ReferralCode /></ErrorBoundary> }, // Added referral code route with error boundary
      { path: '/footertab', element: <SidebarTabs /> },
      { path: '/affiliate', element: <Affiliate /> },
      


    ],
  },

  {
    path: '/information',
    element: <MainProfile />,
  },
  
]);

export default router;