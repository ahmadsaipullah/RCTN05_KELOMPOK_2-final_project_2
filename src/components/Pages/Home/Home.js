import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useCart } from "react-use-cart";
import { saveCart } from "../../../features/slice/savedCartSlice";
import { fetchAllProducts } from "../../../features/slice/productSlice";
import { CardTemplate } from "../../Cards/CardTemplate";

const Home = () => {
  const products = useSelector((state) => state.products?.entities);
  const authState = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { items } = useCart();

  // fetch semua product ketika component di mount
  useEffect(() => {
    // console.log("SOLD STATE AT HOME",soldState)
    // console.log("LOCAL PRODUCTS LENGTH",localStorage.getItem('products').entities)
    const localProducts = JSON.parse(localStorage.getItem("products"));
    console.log("isEmpty", localProducts?.entities?.length === 0);
    console.log("entity", localProducts?.entities);
    if (localProducts?.entities?.length === 0) dispatch(fetchAllProducts());
  });

  // set timeout untuk alert
  useEffect(() => {
    setTimeout(() => setShow(false), 3000);
  }, [show]);

  // effect untuk menyimpan cart ke local storage
  useEffect(() => {
    dispatch(
      saveCart({
        userId: authState.user.email,
        cart: items,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  // alert handler
  const handleAlert = () => {
    setShow(true);
  };

  // console.log("PRODUCTS",products)
  const props = {
    handleAlert,
    authState,
    products,
  };

  return (
    <div className="container home">
      <h2>Product</h2>
      <hr />
      <Alert
        style={{
          position: "fixed",
          zIndex: "9999",
          top: "10%",
          left: "25%",
          right: "25%",
        }}
        show={show}
        variant="success"
      >
        Berhasil Ditambah ke Keranjang
      </Alert>
      <div className="row justify-content-center">
        <CardTemplate {...props} />
      </div>
    </div>
  );
};

export default Home;
