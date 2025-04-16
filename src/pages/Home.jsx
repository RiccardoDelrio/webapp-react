import { useGlobal } from "../Context/GlobalContext"
import { Link } from 'react-router-dom';

export default function Home() {
    
    const { film, idSelezionato, setIdSelezionato } = useGlobal(); 

    const handleMovieSelect = (id) => {
        setIdSelezionato(id);
        console.log(idSelezionato)
    };

    return (
        <div className="container mt-5">
            <h1 className="page-title text-center">Explore Our Movies</h1>
            <div className="row g-4">
                {film && film.map((movie) => (
                    <div className="col-md-4 mb-4" key={movie.id} onClick={() => handleMovieSelect(movie.id)}>
                        <Link to="/details" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="card card_film">
                                <img src={`http://localhost:3000/img/${movie.image}`} className="card-img-top" alt={movie.title} />
                                <div className="card-body">
                                    <h5 className="card-title movie-title">{movie.title}</h5>
                                    <p className="card-text text-muted">{movie.description}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )}