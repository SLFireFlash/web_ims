import DashboardChart from "../components/DashboardChart"
import StatusBar from "../components/StatusBar";
import totalsalesI from '../assets/svg/total_sales.svg';
import totalsales2I from '../assets/svg/total_sales_2.svg';
import DashboardButton from "../components/DashboardButton";
import HamMenu from "../components/HamMenu";

export default function TestA(){

    return(
        <>
        
        {/* <StatusBar Mdata={'$30,000'} Tdata={'Total sales'} Mimg={totalsalesI} TImg={totalsales2I} /> */}
        <div className="ms-5 d-flex">
            {/* <DashboardChart /> */}
             {/* <DashboardButton /> */}
             <HamMenu />

        </div>


        </>
    )
}