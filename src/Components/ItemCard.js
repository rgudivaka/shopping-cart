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
  const add = size => {
    onClick(product, size);
    let newInv = inventory;
    --newInv[product.sku][size];
    setInventory(newInv);
  };
  const inventory = inv.inventory;
  console.log(inventory[product.sku]);
  const setInventory = inv.setInventory;
  const inStock = "In Stock";
  const ooStock = "Out of Stock";
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
          <Tooltip
            placement="top"
            title={inventory[product.sku]["S"] <= 0 ? ooStock : inStock}
            arrow
          >
            <Button
              onClick={() => add("S")}
              disabled={inventory[product.sku]["S"] <= 0}
            >
              Small
            </Button>
          </Tooltip>
          <Tooltip
            placement="top"
            title={inventory[product.sku]["M"] <= 0 ? ooStock : inStock}
            arrow
          >
            <Button
              onClick={() => add("M")}
              disabled={inventory[product.sku]["M"] <= 0}
            >
              Medium
            </Button>
          </Tooltip>
          <Tooltip
            placement="top"
            title={inventory[product.sku]["L"] <= 0 ? ooStock : inStock}
            arrow
          >
            <Button
              onClick={() => add("L")}
              disabled={inventory[product.sku]["L"] <= 0}
            >
              Large
            </Button>
          </Tooltip>
          <Tooltip
            placement="top"
            title={inventory[product.sku]["XL"] <= 0 ? ooStock : inStock}
            arrow
          >
            <Button
              onClick={() => add("XL")}
              disabled={inventory[product.sku]["XL"] <= 0}
            >
              XL
            </Button>
          </Tooltip>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
