
export default function StatusCard({CardName ,content }){

    return(
        <>
            <div className="card">
                <div className="card-content">
                    <h1>{content}</h1>
                </div>
                <div className="card-title">
                    <h3>{CardName}</h3>
                </div>
            </div>
        </>


    );

}