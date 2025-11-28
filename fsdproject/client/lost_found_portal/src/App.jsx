import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import LostItems from './pages/LostItems'
import FoundItems from './pages/FoundItems'
import AddItem from './pages/AddItem'
import ItemDetails from './pages/ItemDetails'

function App() {
  return (
    <>
      <Header />
      <main style={{ padding: '1rem', minHeight: '70vh' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lost" element={<LostItems />} />
          <Route path="/found" element={<FoundItems />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/items/:id" element={<ItemDetails />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
