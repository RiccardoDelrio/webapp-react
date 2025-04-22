import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Details from './pages/details';
import DefaultLayout from "./layout/defaultLayout";
import { GlobalProvider } from "./Context/GlobalContext"
import NotFound from './pages/NotFound';
import Loader from './components/Loader'
import { useGlobal } from "./Context/GlobalContext"
import { useState, useEffect } from 'react';

function AppContent() {
  const { isLoading } = useGlobal();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isLoading]);
  
  return (
    <>
      {(!showContent || isLoading) && <Loader />}
      {showContent && (
        <Router>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/details" element={<Details />} />
              <Route path="/*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      )}
    </>
  )
}

function App() {
  return (
    <GlobalProvider>
      <AppContent />
    </GlobalProvider>
  )
}

export default App
