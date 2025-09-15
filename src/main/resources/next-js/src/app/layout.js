"use client";

import Navbar from './components/navbar';
import './styles/globals.css';
import { useState, useEffect } from 'react';

export default function Layout({ children }) {
  const [isLoggedIn, setIsLoadingIn] = useState(false);



  return (
    <html>
      <head>
        <title>Movie Finder App</title>
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <footer style={{textAlign: "center", marginBlock: "20px"}}>© 2025</footer>
      </body>
    </html>
  );
}
