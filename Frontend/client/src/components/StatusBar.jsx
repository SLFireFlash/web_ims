import { useEffect, useState } from 'react';
import { ThreeDots } from  'react-loader-spinner'



export default function StatusBar({ color,Mdata,Tdata,Mimg,TImg,visible }){
    const [MainImg,setMainImg] = useState(Mimg);
    const [TitleImg,setTitleImg] = useState(TImg);

    const h5Style = {
        color: color || '#fda884', 
      };
    const BgcolorT ={
        backgroundColor: color||'#fda884' 
    }
    return(
        <>
            <div className="main-dashboard-Card">
                <div className='main-card-body'>
                    <ThreeDots
                        visible={visible}
                        height="60"
                        width="80"
                        ariaLabel="ThreeDots-loading"
                        wrapperStyle={{}}
                        wrapperClass="ThreeDots-wrapper"
                        glassColor = '#c0efff'
                        color = '#e15b64'
                        /> 
                    <h3 style={h5Style}>{Mdata}</h3>
                    <img src={MainImg} alt="total sales" />
                </div>
                <div className='main-card-titles' style={BgcolorT}>
                    <h5 >{Tdata}</h5>
                    <img src={TitleImg} alt="total sales 2" />
                </div>
            </div>

        </>
    );
}