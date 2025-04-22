import { createContext, useContext, useState, useEffect } from "react"; 

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    //QUI SI DICHIARANO
    //   LE VARIABILI GLOBALI
    // SI FANNO LE CHIAMTE ALLE API PER PRENDERE I DATI CHE SERVONO A TUTTA L'APPLICAZIONE
    
    //  CHE SERVONO A TUTTA L'APPLICAZIONE E LE FUNZIONI PER MODIFICARLE
    const [film, setFilm] = useState([]); 
    const [idSelezionato, setIdSelezionato] = useState(() => {
        // Recupera l'ID dal localStorage all'avvio
        return localStorage.getItem('selectedMovieId') || null;
    }); // id del film selezionato
    const [filmSelezionato, setFilmSelezionato] = useState([]); // film selezionato
    const [formData, setFormData] = useState({
        movieId: "",
        name: "",
        review: "",
        vote: 0,
    }); // dati del form per l'inserimento della recensione
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSetIdSelezionato = (id) => {
        setIdSelezionato(id);
        if (id) {
            localStorage.setItem('selectedMovieId', id);
        } else {
            localStorage.removeItem('selectedMovieId');
        }
    };

    const submitReview = async () => {
        // Prepara i dati corretti per il backend
        const reviewData = {
            movieId: idSelezionato,
            name: formData.name,
            text: formData.review,
            vote: parseInt(formData.vote)
        };

        try {
            const response = await fetch(`http://localhost:3000/api/movies/${idSelezionato}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Review submitted successfully:', data);

            // Reset form
            setFormData({
                movieId: "",
                name: "",
                review: "",
                vote: 0,
            });

            // Fetch updated movie data
            const movieResponse = await fetch(`http://localhost:3000/api/movies/${idSelezionato}`);
            if (!movieResponse.ok) {
                throw new Error(`HTTP error! status: ${movieResponse.status}`);
            }
            const updatedMovie = await movieResponse.json();
            setFilmSelezionato(updatedMovie);

        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit review. Please try again.');
        }
    };

    useEffect(() => {
        setIsLoading(true);
        
        const fetchData = fetch('http://localhost:3000/api/movies/')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            });

        const minDelay = new Promise(resolve => setTimeout(resolve, 2000));

        Promise.all([fetchData, minDelay])
            .then(([data]) => {
                setFilm(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!idSelezionato) return;
        
        setIsLoading(true);
        
        const fetchMovie = fetch(`http://localhost:3000/api/movies/${idSelezionato}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            });


        const minDelay = new Promise(resolve => setTimeout(resolve, 2000));

        Promise.all([fetchMovie, minDelay])
            .then(([data]) => {
                setFilmSelezionato(data);
                setFormData(prev => ({...prev, movieId: idSelezionato}));
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    }, [idSelezionato]);

    return (
        <GlobalContext.Provider value={{
        //QUI CI VANNO LE VARIABILI GLOBALI CHE VUOI SPOSARE PER TUTTA L'APPLICAZIONE E LE FUNZIONI PER MODIFICARLE
            film,
            setFilm,
            idSelezionato, 
            setIdSelezionato: handleSetIdSelezionato, // Sostituisci con la nuova funzione
            filmSelezionato,
            formData,
            setFormData, 
            submitReview, 
            isLoading,
            setIsLoading
        }}>
            {children}
        </GlobalContext.Provider>
    );
};
/// Custom hook to use the GlobalContext => va scritto cosi e basta
function useGlobal() {
    return useContext(GlobalContext);
}
//ESPORTI ILPROVIDER CHE VA NELLE ROTTE E USE GLOBAL CHE SERVE PER RICHIAMARE LE VARIABILI GLOBALI NELLE VARIE PAGINE
export { useGlobal };