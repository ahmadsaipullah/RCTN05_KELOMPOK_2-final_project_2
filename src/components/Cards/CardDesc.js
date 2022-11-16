import React from "react";
import { Card } from "react-bootstrap";

export const CardDesc = ({ product }) => {
  // console.log("PRODUCT", product)
  return (
    <Card.Text style={{ marginTop: "50px" }}>
      <span className="men">{product.category}</span>
      <br />
      <b>Stock: {product.stock}</b>
      <br />
      <b>Terjual: {product.sold}</b>
      <br />
      <br />
      {product.description.substring(0, 100) + "..."}
    </Card.Text>
  );
};
