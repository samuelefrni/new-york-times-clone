import React from "react"
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Section from "./pages/Section";
import Search from "./pages/Search";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/section/:sectionName' element={<Section />} />
        <Route exact path='/search/:searchName' element={<Search />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
