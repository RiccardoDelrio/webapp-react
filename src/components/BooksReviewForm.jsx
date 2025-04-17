import { useGlobal } from "../Context/GlobalContext";
import { useState } from "react";

export default function BooksReviewForm() {
    const { formData, setFormData, submitReview } = useGlobal();
    const [errors, setErrors] = useState({
        name: '',
        review: '',
        vote: ''
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            name: '',
            review: '',
            vote: ''
        };

        // Name validation
        if (!formData?.name || formData.name.length < 3) {
            newErrors.name = 'Name must be at least 3 characters long';
            isValid = false;
        }
        if (formData.name.length > 50) {
            newErrors.name = 'Name must be less than 50 characters';
            isValid = false;
        }

        // Review validation
        if (!formData?.review || formData.review.length < 10) {
            newErrors.review = 'Review must be at least 10 characters long';
            isValid = false;
        }
        if (formData.review.length > 500) {
            newErrors.review = 'Review must be less than 500 characters';
            isValid = false;
        }

        // Vote validation
        const voteNum = Number(formData?.vote);
        if (isNaN(voteNum) || voteNum < 1 || voteNum > 5) {
            newErrors.vote = 'Vote must be between 1 and 5';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            submitReview();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return(
        <div>
            <h1>Add Review</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input 
                        type="text" 
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="review" className="form-label">Review</label>
                    <textarea 
                        className={`form-control ${errors.review ? 'is-invalid' : ''}`}
                        id="review"
                        name="review"
                        value={formData.review}
                        onChange={handleInputChange}
                        rows="3" 
                        required
                    ></textarea>
                    {errors.review && <div className="invalid-feedback">{errors.review}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="vote" className="form-label">Vote (1-5)</label>
                    <input 
                        type="number" 
                        className={`form-control ${errors.vote ? 'is-invalid' : ''}`}
                        id="vote"
                        name="vote"
                        value={formData.vote}
                        onChange={handleInputChange}
                        min="1" 
                        max="5" 
                        required 
                    />
                    {errors.vote && <div className="invalid-feedback">{errors.vote}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Submit Review</button>
            </form>
        </div>
    );
}