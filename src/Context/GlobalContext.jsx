import { createContext, useContext, useState, useEffect } from "react"; 

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    //QUI SI DICHIARANO
    //   LE VARIABILI GLOBALI
    // SI FANNO LE CHIAMTE ALLE API PER PRENDERE I DATI CHE SERVONO A TUTTA L'APPLICAZIONE
    
    //  CHE SERVONO A TUTTA L'APPLICAZIONE E LE FUNZIONI PER MODIFICARLE
    const [film, setFilm] = useState(null); // Esempio di variabile globale


    return (
        <GlobalContext.Provider value={{
        //QUI CI VANNO LE VARIABILI GLOBALI CHE VUOI SPOSARE PER TUTTA L'APPLICAZIONE E LE FUNZIONI PER MODIFICARLE
            film,
            setFilm
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