import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "react-use-cart";

const Details = () => {
  const param = useParams();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const { items, addItem, updateItemQuantity, getItem, inCart } = useCart();
  const [state, setState] = useState([]);
  const [show, setShow] = useState(false)
  const [quantity, setQuantity] = useState(
    getItem(param.id) ? getItem(parseInt(param.id))?.quantity : 0
  );

  // set timeout untuk alert
  useEffect(() => {
    if(show) setTimeout(() => setShow(false), 3000)
  }, [show])

  // useEffect untuk fetching api product detail
  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${param.id}`).then((res) => {
      setState(res.data);
    });
    // if (getItem(parseInt(param.id))) setQuantity(getItem(parseInt(param.id)).quantity)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log("AUTH", localStorage.getItem("auth"));

  const handleClick = (state, quantity) => {
    addItem(state, quantity)
    setShow(true)
  }

  return (
    <div className="container details">
      <Alert style={{ position: "fixed", zIndex: "9999", top: "10%", left: "25%", right: "25%" }} show={show} variant="success">
        Berhasil Ditambah ke Keranjang
      </Alert>
      <div className="row">
        <div className="col-md-6">
          <img src={state.image} alt="gambar" className="img-fluid" />
        </div>
        <div className="col-md-6">
          <div className="detail">
            <a href="/">Home</a>/<a href="/">{state.category}</a>
          </div>
          <h1 className="my-4">{state.title}</h1>
          <p>
            <b>$ {state.price}</b>
          </p>
          <select>
            <option>Size</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
          </select>
          {/* {console.log("THIS ITEM", thisItem.quantity)} */}
          {/* {console.log("CART ITEMS", items)}
          {console.log("QUANTITY", quantity)}
          {console.log("GET ITEM", getItem(parseInt(param.id)))} */}
          <div className="d-flex my-4">
            {/* check apakah admin atau bukan */}
            {authState.user.role !== "admin" && (
              <div style={{ display: "flex", gap: "0.25rem" }}>
                <button
                  onClick={() => setQuantity(quantity === 0 ? quantity - 1 : 0)}
                  className="btn btn-dark"
                >
                  -
                </button>
                <input
                  style={{ maxWidth: "60px" }}
                  type="text"
                  pattern="[0-9]*"
                  min={0}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      parseInt(e.target.value === "" ? 0 : e.target.value)
                    )
                  }
                  onKeyPress={(event) => {
                    // prevent keypress selain number
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="btn btn-dark"
                >
                  +
                </button>
              </div>
            )}
            {authState.user.role !== "admin" &&
              (inCart(parseInt(param.id)) ? (
                <button
                  onClick={() => updateItemQuantity(state.id, quantity)}
                  className="btn btn-primary ml-2"
                >
                  Update Cart
                </button>
              ) : (
                <button
                  onClick={() =>
                    authState.isLoginSuccess
                      ? handleClick(state, quantity)
                      : navigate("/login")
                  }
                  className="btn btn-primary ml-2"
                >
                  Add To Cart
                </button>
              ))}
          </div>
          <div>
            <h3>Product Details</h3>
            <p>{state.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
