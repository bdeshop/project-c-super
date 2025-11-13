
import Benefits from "../components/Vouchers/Benefits";
import ClaimVoucher from "../components/Vouchers/ClaimVoucher";
import Rewards from "../components/Vouchers/Rewards";


const Voucher = () => {
    return (
        <div>
            <ClaimVoucher/>
            <Benefits/>
            <Rewards/>
        </div>
    );
};

export default Voucher;