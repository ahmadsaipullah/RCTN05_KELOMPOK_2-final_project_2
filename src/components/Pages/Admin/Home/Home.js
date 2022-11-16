import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateStock } from "../../../../features/slice/productSlice";

const Home = () => {
  const products = useSelector(state => state.products.entities)
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()
  // state untuk menyimpan stock barang
  const [stock, setStock] = useState(() =>
    products.map((item) => ({ id: item.id, stock: item.stock })
    ))

  useEffect(() => {
    setTimeout(() => setShow(false), 3000)
  }, [show])

  // function untuk menangani perubahan value langsung dari input
  const handleChange = (event, id) => {
    setStock(() => {
      const newObject = stock.map(i => i.id === id ? { ...i, stock: parseInt(event.target.value === '' ? 0 : event.target.value) } : i)
      // console.log(newObject)
      return newObject
    });
  }
  // function untuk menangani perubahaan value increment dan decrement
  const handleClickChange = (value, id) => {
    setStock(() => {
      const newObject = stock.map(i => i.id === id ? { ...i, stock: value <= 0 ? 0 : value } : i)
      // console.log(newObject)
      return newObject
    });
  }

  const handleClick = (item) => {
    dispatch(updateStock(stock.find(i => i.id === item.id)))
    setShow(true)
  }

  return (
    <div className="container home">
      <h1>Update Stock</h1>
      <Alert style={{ position: "fixed", zIndex: "9999", top: "10%", left: "25%", right: "25%" }} show={show} variant="success">
        Berhasil Ditambah ke Keranjang
      </Alert>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col" colSpan="2">
              Product
            </th>
            <th scope="col">Stock</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) =>
            <tr key={item.id}>
              <th scope="row">
                <img src={item.image} alt="gambar" className="img-fluid" width={150} />
              </th>
              <td>
                <h3>
                  <b>{item.title}</b>
                </h3>
                <p>
                  {item.description.substring(0, 100) + "..."}
                </p>
                <p className="text-muted">{item.category}</p>
              </td>
              <td>
                <div style={{ display: "flex", gap: "0.25rem" }}>
                  <button
                    onClick={() => { handleClickChange(stock.find(i => i.id === item.id)?.stock - 1, item.id) }}
                    className="btn btn-dark"
                  >-</button>
                  <input
                    type="text"
                    pattern="[0-9]*"
                    className="form-control form-control-color"
                    min={0}
                    value={stock.find(i => i.id === item.id)?.stock}
                    onChange={(event) => handleChange(event, item.id)}
                    onKeyPress={(event) => { // prevent keypress selain number
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      handleClickChange(stock.find(i => i.id === item.id)?.stock + 1, item.id)
                    }}
                    className="btn btn-dark"
                  >+</button>
                </div>
              </td>
              <td>
                <button
                  onClick={() => { handleClick(item) }}
                  className="btn btn-primary"
                >Update</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
