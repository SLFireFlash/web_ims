import { Link } from "react-router-dom"

Link
export default function NotFound(){
    return(
        <>
            <div className="not-found">
                <h1>404</h1>
                <h3>Page Not Found</h3>
                <p>If you came upon this page by mistake, try checking the URL in your web browser.</p>
                <Link to='/'>Go Back To Home</Link>
            </div>
        </>
    )

}