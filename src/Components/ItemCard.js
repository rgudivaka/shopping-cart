import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  Button,
  ButtonGroup,
  Tooltip
} from "@material-ui/core";

const ItemCard = ({ product, onClick, inv }) => {
  const inventory = inv.inventory;
  const setInventory = inv.setInventory;
  const add = size => {
    onClick(product, size);
    let newInv = inventory;
    --newInv[product.sku][size];
    setInventory(newInv);
  };
  const inStock = size => {
    if (!inventory) return true;
    return inventory[product.sku][size] <= 0;
  };
  return (
    <Card variant="outlined">
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Product Image"
          height="140"
          image={"/data/products/" + product.sku + "_1.jpg"}
          title="Product Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.style}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" component="p">
            ${product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
        >
          <Tooltip placement="top" title={"In Stock"} arrow>
            <Button onClick={() => add("S")} disabled={inStock("S")}>
              Small
            </Button>
          </Tooltip>
          <Tooltip placement="top" title={"In Stock"} arrow>
            <Button onClick={() => add("M")} disabled={inStock("M")}>
              Medium
            </Button>
          </Tooltip>
          <Tooltip placement="top" title={"In Stock"} arrow>
            <Button onClick={() => add("L")} disabled={inStock("L")}>
              Large
            </Button>
          </Tooltip>
          <Tooltip placement="top" title={"In Stock"} arrow>
            <Button onClick={() => add("XL")} disabled={inStock("XL")}>
              XL
            </Button>
          </Tooltip>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
