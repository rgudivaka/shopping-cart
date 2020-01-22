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

const ItemCard = ({ product, onClick, inventory, appInventory }) => {
  console.log(inventory);
  const [state, setState] = useState({
    small: {
      stock: "In Stock",
      disabled: false
    },
    medium: {
      stock: "In Stock",
      disabled: false
    },
    large: {
      stock: "In Stock",
      disabled: false
    },
    xl: {
      stock: "In Stock",
      disabled: false
    }
  });
  console.log(state);
  const add = size => {
    onClick(product, size);
    checkInventory();
  };

  const checkInventory = () => {
    for (var key in inventory) {
      if (inventory[key] === 0) {
        if (key === "S") {
          const newState = {
            stock: "Out of Stock",
            disabled: true
          };
          setState({ ...state, small: newState });
        } else if (key === "M") {
          setState({
            ...state,
            medium: {
              stock: "Out of Stock",
              disabled: true
            }
          });
        } else if (key === "L") {
          setState({
            ...state,
            large: {
              stock: "Out of Stock",
              disabled: true
            }
          });
        } else if (key === "XL") {
          setState({
            ...state,
            xl: {
              stock: "Out of Stock",
              disabled: true
            }
          });
        }
      }
    }
  };
  useEffect(() => {
    const checkInventory = () => {
      for (var key in inventory) {
        if (inventory[key] === 0) {
          if (key === "S") {
            const newState = {
              stock: "Out of Stock",
              disabled: true
            };
            setState({ ...state, small: newState });
          } else if (key === "M") {
            setState({
              ...state,
              medium: {
                stock: "Out of Stock",
                disabled: true
              }
            });
          } else if (key === "L") {
            setState({
              ...state,
              large: {
                stock: "Out of Stock",
                disabled: true
              }
            });
          } else if (key === "XL") {
            setState({
              ...state,
              xl: {
                stock: "Out of Stock",
                disabled: true
              }
            });
          }
        }
      }
    };
    checkInventory();
  }, [setState, inventory]);
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
          <Tooltip placement="top" title={state.small.stock} arrow>
            <Button
              onClick={() => add("Small")}
              disabled={state.small.disabled}
            >
              Small
            </Button>
          </Tooltip>
          <Tooltip placement="top" title={state.medium.stock} arrow>
            <Button
              onClick={() => add("Medium")}
              disabled={state.medium.disabled}
            >
              Medium
            </Button>
          </Tooltip>
          <Tooltip placement="top" title={state.large.stock} arrow>
            <Button
              onClick={() => add("Large")}
              disabled={state.large.disabled}
            >
              Large
            </Button>
          </Tooltip>
          <Tooltip placement="top" title={state.xl.stock} arrow>
            <Button
              onClick={() => add("Xtra Large")}
              disabled={state.xl.disabled}
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
