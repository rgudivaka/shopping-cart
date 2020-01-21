import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import ItemCard from "./Components/ItemCard";
const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/data/products.json");
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  const itemCards = products.map(product => (
    <Grid item key={product.sku}>
      <ItemCard key={product.sku} product={product} />
    </Grid>
  ));
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        {itemCards}
      </Grid>
    </div>
  );
};

export default App;
