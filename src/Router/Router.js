import { Route, Routes as Switch } from "react-router-dom";

import Home from "../components/Pages/Home/Home";
import Login from "../components/Pages/Login/Login";
import Details from "../components/Pages/Details/Details";
import Cart from "../components/Pages/Cart/Cart";
import AdminHome from "../components/Pages/Admin/Home/Home";
import RekapanPenjualan from "../components/Pages/Admin/Rekapan/RekapanPenjualan";
import ProtectedRoute from "./ProtectedRoute";
import About from "../components/Pages/About/About";
// import { useSelector } from "react-redux";

const Routes = () => {
  // const authState = useSelector((state) => state.auth);

  return (
    <>
      <div className="container">
        <Switch>
          {/* <Route exact path="/admin" element={<AdminHome />} /> */}
          <Route
            exact
            path="/admin"
            element={
              <ProtectedRoute props="forAdmin">
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/rekap"
            element={
              <ProtectedRoute props="forAdmin">
                <RekapanPenjualan />
              </ProtectedRoute>
            }
          />
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/login"
            element={
              <ProtectedRoute props="forAll">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/about"
            element={
              <ProtectedRoute props="forAll">
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/cart"
            element={
              <ProtectedRoute props="forUser">
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route path="/details/:id" element={<Details />} />
        </Switch>
      </div>
    </>
  );
};

export default Routes;
