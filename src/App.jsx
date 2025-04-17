import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Details from './pages/details';
import DefaultLayout from "./layout/defaultLayout";
import { GlobalProvider } from "./Context/GlobalContext"
import NotFound from './pages/NotFound';
function App() {

  return (
    <>
     <GlobalProvider>
        <Router>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/details" element={<Details />} />
              <Route path="/*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
        </GlobalProvider>
    </>
  )
}

export default App
