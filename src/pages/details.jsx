import { useGlobal } from "../Context/GlobalContext"

export default function Details() {
    
    const { film } = useGlobal();

    return (
        <div className="container mt-5">
            <h1>Welcome to the Home Page</h1>
            <div className="row">
                {film && film.map((movie) => (
                    <div className="col-md-4 mb-4" key={movie.id}>
                        <div className="card card_film">
                            <img src={`http://localhost:3000/img/${movie.image}`} className="card-img-top" alt={movie.title} />
                            <div className="card-body">
                                <h5 className="card-title">{movie.title}</h5>
                                <p className="card-text">{movie.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
           
        </div>
    )}