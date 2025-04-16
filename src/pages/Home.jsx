import { useGlobal } from "../contexts/GlobalContext"

export default function Home() {
    
    const { film } = useGlobal();

    return (
        <div className="container mt-5">
            <h1>Welcome to the Home Page</h1>
           
        </div>
    )}