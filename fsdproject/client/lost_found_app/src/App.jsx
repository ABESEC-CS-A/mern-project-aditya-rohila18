import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

const Home = () => <h1>Home Page</h1>
const About = () => <h1>About Page</h1>
const Contact = () => <h1>Contact Page</h1>
const Login = () => <h1>Login Page</h1>
const Register = () => <h1>Register Page</h1>
const NotFound = () => <h1>404 - Page Not Found</h1>

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
