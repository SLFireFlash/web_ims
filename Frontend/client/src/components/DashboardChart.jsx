import chart from '../assets/chart.png';
import delete_history from '../assets/svg/delete_history.svg';

export default function DashboardChart(){

    return(
        <>
            <div className="mainChart">
                <div className="chartTitle">
                    <div>
                        <h3>sales history report</h3>
                        <p>A summary of a company's sales activities</p>
                    </div>
                    <img src={delete_history} alt="delete_history" />
                </div>
                <div className="chartData">
                    <img src={chart} alt="chart" />
                </div>
                
            </div>
        </>
    )
}