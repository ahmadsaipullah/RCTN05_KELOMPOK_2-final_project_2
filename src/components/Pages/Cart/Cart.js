import React, { useEffect, useState } from "react";
import Logo from "../../../images/cart.png";
import { useCart } from "react-use-cart";
import { Alert, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { checkout } from "../../../features/slice/productSlice";

const Cart = () => {
  const { items, emptyCart, updateItemQuantity, cartTotal, isEmpty } =
    useCart();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [alertShow, setAlertShow] = useState(false)

  // state untuk menyimpan jumlah kuantitas belanjaan
  const [quantity, setQuantity] = useState(() => {
    const v = {};
    items.forEach((item) => Object.assign(v, { [item.id]: item.quantity }));
    return v;
  });

  // useEffect untuk mengupdate kuantitas barang pada cart
  useEffect(() => {
    Object.keys(quantity).forEach((key) => {
      const found = items.find((e) => parseInt(e.id) === parseInt(key))?.stock;
      if (parseInt(quantity[key]) >= found) {
        setShow(true);
      } else {
        updateItemQuantity(parseInt(key), parseInt(quantity[key]));
        setShow(false);
      }
      console.log(key);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  useEffect(() => {
    if (alertShow) setInterval(() => {
      setAlertShow(false)
    }, 3000);
  }, [alertShow])

  // console.log(value)
  // console.log(value[2])

  return (
    <div className="container cart ">
      <Alert style={{ position: "fixed", zIndex: "9999", top: "10%", left: "25%", right: "25%" }} show={show} variant="danger">
        Quantity Melebihi Stock
      </Alert>
      <Alert style={{ position: "fixed", zIndex: "9999", top: "10%", left: "25%", right: "25%" }} show={alertShow} variant="success">
        Checkout Berhasil
      </Alert>
      <div className="header">
        <img src={Logo} alt="gambar" width={50} />
        <span className="my-cart">My Cart</span>
      </div>
      <hr />
      {isEmpty ? (
        <h1>Keranjang Belanjaan anda Kosong</h1>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col">Stock</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                return (
                  <tr key={item.id}>
                    <th scope="row">
                      <img
                        src={item.image}
                        alt="gambar"
                        className="img-fluid"
                        width={50}
                      />
                    </th>
                    <td>
                      <p>{item.title}</p>
                    </td>
                    <td>
                      <p>{item.stock}</p>
                    </td>
                    <td>
                      <p>$ {item.price}</p>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-color"
                        min={0}
                        value={quantity[item.id]}
                        onChange={(e) =>
                          setQuantity((prevValue) => ({
                            ...prevValue,
                            [item.id]: parseInt(e.target.value),
                          }))
                        }
                      />
                    </td>
                    <td>
                      $ {Math.round(item.price * quantity[item.id] * 100) / 100}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td colSpan={2}>
                  <b>Total Belanjaan</b>
                </td>
                <td>
                  <p>$ {Math.round(cartTotal * 100) / 100}</p>
                </td>
              </tr>
            </tbody>
          </table>
          <Button
            style={{ marginRight: "10px" }}
            variant="warning"
            onClick={() => emptyCart()}
          >
            Clear Cart
          </Button>
          <Button
            variant="success"
            onClick={() => {
              setAlertShow(true)
              dispatch(checkout(items));
              emptyCart();
            }}
          >
            Checkout
          </Button>
        </>
      )}
    </div>
  );
};

export default Cart;
