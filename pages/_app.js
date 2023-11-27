import React, { useEffect } from "react";
import "../styles/globals.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.css";
import { SSRProvider } from "react-bootstrap";

function App({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.js");
  }, []);

  return (
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  );
}

export default App;
