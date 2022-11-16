import React from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Index";
import { CartProvider } from "react-use-cart";
import Routes from "./Router/Router";

function App() {
  return (
    <>
      <CartProvider>
        <Navbar />
        <Routes />
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
