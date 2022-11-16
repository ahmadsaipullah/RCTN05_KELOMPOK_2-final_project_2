import React from "react";
import Card from "react-bootstrap/Card";
import { CardButtons } from "./CardButtons";
import { CardDesc } from "./CardDesc";

export const CardTemplate = (props) => {
  return (
    <>
      {/* {console.log("CARD TEMPLATE PROPS", props)} */}
      {props.products.map((product) => {
        return (
          <Card
            key={product.id}
            className="card"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Card.Img
              style={{
                margin: "auto",
                width: "200px",
                height: "200px",
                padding: "40px",
              }}
              variant="top"
              src={product.image}
            />
            <Card.Body>
              <Card.Title>
                <b>{product.title}</b>
              </Card.Title>
              <CardDesc product={product} />
              <CardButtons
                product={product}
                state={props.authState}
                handleAlert={props.handleAlert}
              />
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};
