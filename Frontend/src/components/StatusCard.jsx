import { MagnifyingGlass } from  'react-loader-spinner'
export default function StatusCard({CardName ,content,visible }){

    return(
        <>
            <div className="card">
                <div className="card-content">
                <MagnifyingGlass
                    visible={visible}
                    height="60"
                    width="80"
                    ariaLabel="MagnifyingGlass-loading"
                    wrapperStyle={{}}
                    wrapperClass="MagnifyingGlass-wrapper"
                    glassColor = '#c0efff'
                    color = '#e15b64'
                    />                 
                <h1>{content}</h1>
                </div>
                <div className="card-title">
                    <h3>{CardName}</h3>
                </div>
            </div>
        </>


    );

}