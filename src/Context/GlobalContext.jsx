import { createContext, useContext, useState, useEffect } from "react"; 

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    //QUI SI DICHIARANO
    //   LE VARIABILI GLOBALI
    // SI FANNO LE CHIAMTE ALLE API PER PRENDERE I DATI CHE SERVONO A TUTTA L'APPLICAZIONE
    
    //  CHE SERVONO A TUTTA L'APPLICAZIONE E LE FUNZIONI PER MODIFICARLE
    const [film, setFilm] = useState(null); 
    const [idSelezionato, setIdSelezionato] = useState(null); // id del film selezionato
const [filmSelezionato, setFilmSelezionato] = useState(null); // film selezionato
useEffect(() => {
    fetch('http://localhost:3000/api/movies/')
    .then(response => response.json())
    .then(data => {
        setFilm(data);
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}, []);

useEffect(() => {
    fetch(`http://localhost:3000/api/movies/${idSelezionato}`)
    .then(response => response.json())
    .then(data => {
        setFilmSelezionato(data);
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}, [idSelezionato]);
    return (
        <GlobalContext.Provider value={{
        //QUI CI VANNO LE VARIABILI GLOBALI CHE VUOI SPOSARE PER TUTTA L'APPLICAZIONE E LE FUNZIONI PER MODIFICARLE
            film,
            setFilm,
            idSelezionato, // aggiunto idSelezionato
            setIdSelezionato, // aggiunto setIdSelezionato
            filmSelezionato // aggiunto filmSelezionato
             // aggiunto setFilmSelezionato
        }}>
            {children}
        </GlobalContext.Provider>
    );
}
/// Custom hook to use the GlobalContext => va scritto cosi e basta
function useGlobal() {
    return useContext(GlobalContext);
}
//ESPORTI ILPROVIDER CHE VA NELLE ROTTE E USE GLOBAL CHE SERVE PER RICHIAMARE LE VARIABILI GLOBALI NELLE VARIE PAGINE
export { GlobalProvider, useGlobal };