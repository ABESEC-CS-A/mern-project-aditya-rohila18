import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Register from './components/Register'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <header style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </nav>
        </header>

        <main style={{ padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
