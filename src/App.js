import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("./data/products.json");
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Container>
        {products.map(product => (
          <Card key={product.sku}>
            <CardImg
              style={{
                height: "30vh",
                width: "50vh"
              }}
              top
              src={require("../public/data/products/" + product.sku + "_1.jpg")}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle>{product.title}</CardTitle>
              <CardText>{product.style}</CardText>
              <Button color="success">Add to Cart</Button>
            </CardBody>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default App;
