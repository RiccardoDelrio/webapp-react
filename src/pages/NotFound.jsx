import { Link } from "react-router-dom"
export default function NotFound() {
    return (
        <div className="container mt-5">
            <h1 className="page-title text-center">Page Not Found</h1>
            <p className="text-center">Sorry, the page you are looking for does not exist.</p>
            <p className="text-center">You can go back to the <Link to="/">home page</Link>.</p>
          
        </div>
    )
}