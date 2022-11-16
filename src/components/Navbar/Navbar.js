import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { logout } from "../../features/slice/authSlice";
import logo from "../../images/logo.png";

const NavbarN = () => {
  const [isredirect, setRedirect] = useState();
  const location = useLocation();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { emptyCart } = useCart();

  useEffect(() => {
    setRedirect(location.pathname);
  }, [location]);

  const home = isredirect === "/" ? "active" : "";
  const admin = isredirect === "/admin" ? "active" : "";
  const rekap = isredirect === "/rekap" ? "active" : "";
  const login = isredirect === "/login" ? "active" : "";
  const about = isredirect === "/about" ? "active" : "";
  const cart = isredirect === "/cart" ? "active" : "";

  return (
    <>
      <Navbar bg="light" expand="lg" className="fixed-top navbar">
        <Container>
          <Navbar.Brand href="/" className="ml-4">
            <img src={logo} alt="gambar" width={50} />
            <span style={{ paddingLeft: "20px" }}>Casuals Store</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/" className={home}>
                Home
              </Nav.Link>
              {authState.user.role === "admin" && (
                <>
                  <Nav.Link as={Link} to="/admin" className={admin}>
                    Admin Master
                  </Nav.Link>
                  <Nav.Link as={Link} to="/rekap" className={rekap}>
                    Rekapan Penjualan
                  </Nav.Link>
                </>
              )}
              {authState.user.role === "user" && (
                <>
                  <Nav.Link as={Link} to="/cart" className={cart}>
                    Cart
                  </Nav.Link>
                </>
              )}
              {authState.isLoginSuccess && (
                <>
                  <Nav.Link
                    as={Link}
                    to="/"
                    onClick={() => {
                      emptyCart();
                      dispatch(logout());
                    }}
                  >
                    Logout
                  </Nav.Link>
                </>
              )}
              {!authState.isLoginSuccess && (
                <>
                  <Nav.Link as={Link} to="/about" className={about}>
                    About
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login" className={login}>
                    Login
                  </Nav.Link>
                </>
              )}
            </Nav>
            <div className="d-flex">Welcome, {authState.user.email}</div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarN;
