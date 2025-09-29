"use client";

import LoginForm from './components/loginform';
import Navbar from './components/navbar';
import RegisterForm from './components/registerform';
import './styles/globals.css';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';

export default function Layout({ children }) {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decoded = jwtDecode(token);
      setUsername(decoded.sub);
      // Optional: validate token here (e.g., decode and check expiration)
      // You can decode JWT if it's a JWT token:
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiration = payload.exp;

        // Check if token is expired
        if (expiration * 1000 > Date.now()) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        // Token is invalid or decoding failed
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  

  const handleRegisterButton = (value) => {
    setShowRegisterForm(value);
  }

  const handleLoginButton = (value) => {
    setShowLoginForm(value);
  }

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  return (
    <html>
      <head>
        <title>Movie Finder App</title>
      </head>
      <body>
        <LoginForm showLoginForm={showLoginForm} handleLoginButton={handleLoginButton} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <RegisterForm showRegisterForm={showRegisterForm} handleRegisterButton={handleRegisterButton} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Navbar handleRegisterButton={handleRegisterButton} handleLoginButton={handleLoginButton} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} username={username} />
          <main>{children}</main>
          <footer style={{textAlign: "center", marginBlock: "20px"}}>© 2025</footer>
      </body>
    </html>
  );
}
