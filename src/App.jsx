import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import DefaultLayout from "./layout/defaultLayout";

function App() {

  return (
    <>
            <Router>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />

          </Route>
        </Routes>
      </Router>
     
    </>
  )
}

export default App
