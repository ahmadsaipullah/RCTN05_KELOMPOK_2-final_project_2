import React, { useState } from "react";
import { useSelector } from "react-redux";

const RekapanPenjualan = () => {
  const products = useSelector((state) => state.products.entities);
  // state untuk menyimpan total keuntungan barang terjual
  // eslint-disable-next-line no-unused-vars
  const [total, setTotal] = useState(() => {
    let ttl = 0;
    products.forEach((e) => {
      ttl += e.price * e.sold;
    });
    return ttl;
  });
  console.log(products);
  console.log("TOTAL", total);

  return (
    <div className="container home">
      <h1>Rekap Penjualan</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col" colSpan="2">
              Product
            </th>
            <th scope="col">Harga</th>
            <th scope="col">Terjual</th>
            <th scope="col">Pendapatan</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => {
            return (
              <tr key={item.id}>
                {/* {console.log("mapped", item)} */}
                <th scope="row" colSpan="2">
                  <h3>
                    <b>{item.title}</b>
                  </h3>
                  <p className="text-muted">{item.category}</p>
                </th>
                <td>
                  <p>$ {item.price}</p>
                </td>
                <td>
                  <p>{item.sold}</p>
                </td>
                <td>
                  <p>$ {item.price * item.sold}</p>
                </td>
              </tr>
            );
          })}
          <tr>
            <td></td>
            <td></td>
            <td colSpan="2">
              <b>Total Pendapatan</b>
            </td>
            <td>
              <p>$ {Math.round(total * 100) / 100}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RekapanPenjualan;
