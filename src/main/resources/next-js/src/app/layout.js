import './styles/globals.css';

export default function Layout({ children }) {
  return (
    <html>
      <head>
        <title>Movie Finder App</title>
      </head>
      <body>
        <main>{children}</main>
        <footer style={{textAlign: "center", marginBlock: "20px"}}>© 2025</footer>
      </body>
    </html>
  );
}
