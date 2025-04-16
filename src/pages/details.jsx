import { useGlobal } from "../Context/GlobalContext"

export default function Details() {
    const { filmSelezionato } = useGlobal();

    return (
        <div className="container mt-5">
            <h1 className="page-title text-center mb-5">Movie Details</h1>
            <div className="row g-4">
                {filmSelezionato && (
                    <>
                        <div className="col-md-4 mb-4">
                            <div className="card card_film">
                                <img src={`http://localhost:3000/img/${filmSelezionato.image}`} className="card-img-top" alt={filmSelezionato.title} />
                                <div className="card-body">
                                    <h3 className="movie-title mb-4">{filmSelezionato.title}</h3>
                                    <p className="card-text mb-3"><strong>Director:</strong> {filmSelezionato.director}</p>
                                    <p className="card-text mb-3"><strong>Genre:</strong> {filmSelezionato.genre}</p>
                                    <p className="card-text mb-3"><strong>Release Year:</strong> {filmSelezionato.release_year}</p>
                                    <p className="card-text"><strong>Abstract:</strong> {filmSelezionato.abstract}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-8">
                            <h4 className="movie-title mb-4">Reviews</h4>
                            {filmSelezionato.reviews.map((review) => (
                                <div key={review.id} className="card review-card">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h5 className="card-title mb-0">{review.name}</h5>
                                            <span className="badge rating-badge">Rating: {review.vote}/5</span>
                                        </div>
                                        <p className="card-text text-muted">{review.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {!filmSelezionato && <p className="text-center">No details available.</p>}
            </div>
        </div>
    )
}