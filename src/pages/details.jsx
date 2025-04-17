import { useGlobal } from "../Context/GlobalContext"
import { Navigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function Details() {
    const { filmSelezionato, formData, setFormData, submitReview, setIdSelezionato } = useGlobal();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const movieId = searchParams.get('id');
        if (movieId) {
            setIdSelezionato(movieId);
        }
    }, [searchParams]);

    // Redirect to NotFound if no film is selected
    if (!filmSelezionato || Object.keys(filmSelezionato).length === 0) {
        return <Navigate to="/*" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Form validation
        if (!formData.name || formData.name.length < 3) {
            alert('Name must be at least 3 characters long');
            return;
        }
        if (!formData.review || formData.review.length < 10) {
            alert('Review must be at least 10 characters long');
            return;
        }
        if (!formData.vote || formData.vote < 1 || formData.vote > 5) {
            alert('Vote must be between 1 and 5');
            return;
        }
        
        await submitReview();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="container mt-5">
            <h1>Movie Details</h1>
            <div className="row">
                {filmSelezionato && (
                    <>
                        <div className="col-md-4 mb-4">
                            <div className="card card_film">
                                <img src={`http://localhost:3000/img/${filmSelezionato.image}`} className="card-img-top" alt={filmSelezionato.title} />
                                <div className="card-body">
                                    <h3 className="card-title">{filmSelezionato.title}</h3>
                                    <p className="card-text"><strong>Director:</strong> {filmSelezionato.director}</p>
                                    <p className="card-text"><strong>Genre:</strong> {filmSelezionato.genre}</p>
                                    <p className="card-text"><strong>Release Year:</strong> {filmSelezionato.release_year}</p>
                                    <p className="card-text"><strong>Abstract:</strong> {filmSelezionato.abstract}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-8">
                            <h4 className="mb-3">Reviews</h4>
                            {Array.isArray(filmSelezionato.reviews) && filmSelezionato.reviews.map((review) => (
                                <div key={review.id} className="card mb-3">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <h5 className="card-title">{review.name}</h5>
                                            <span className="badge bg-primary">Rating: {review.vote}/5</span>
                                        </div>
                                        <p className="card-text">{review.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="col-md-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h4>Add a Review</h4>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required 
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="review" className="form-label">Review</label>
                                            <textarea 
                                                className="form-control" 
                                                id="review"
                                                name="review"
                                                value={formData.review}
                                                onChange={handleInputChange}
                                                rows="3" 
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="vote" className="form-label">Vote (1-5)</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                id="vote"
                                                name="vote"
                                                value={formData.vote}
                                                onChange={handleInputChange}
                                                min="1" 
                                                max="5" 
                                                required 
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Submit Review</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {!filmSelezionato && <p>No details available.</p>}
            </div>
        </div>
    )
}