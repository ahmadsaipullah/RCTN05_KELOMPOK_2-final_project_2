import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ props, children }) {
  const authState = useSelector((state) => state.auth);
  let location = useLocation();
  console.log("PROPS", props)
  console.log("USER ROLE", authState.user.role)
  console.log("LOGIN STATUS", authState.isLoginSuccess)

  // verifikasi autentikasi untuk setiap page
  // jika user sudah login maka page2 akan terbuka
  if (authState.isLoginSuccess) {
    if (props === "forAdmin") {
      if (authState.user.role === "admin") {
        return children
      } else {
        return <Navigate to="/" state={{ from: location }} />
      }
    } else if (props === "forUser") {
      if (authState.user.role === "user") {
        return children
      } else {
        return <Navigate to="/" state={{ from: location }} />
      }
    } else {
      return <Navigate to="/" state={{ from: location }} />
    }
  } else if (props === "forAll") {
    return children
  } else {
    return <Navigate to="/login" state={{ from: location }} />
  }
}
