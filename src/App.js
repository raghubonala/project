import React from 'react'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import Home from './Components/Home';
import "./App.css"
import Catagory from './Components/Catagory';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Contact from './Components/Contact';
import About from './Components/About';

const App = () => {
  return (
    <>
<Router>
  <Navbar/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/category' element={<Catagory/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/about' element={<About/>}/>
  </Routes>
  <Footer/>
</Router>
    </>
  )
}

export default App