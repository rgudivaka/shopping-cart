import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  Divider,
  ListItemText,
  ListItem,
  ListItemIcon
} from "@material-ui/core";
import ItemCard from "./Components/ItemCard";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import CartItem from "./Components/CartItem";

const useStyles = makeStyles(theme => ({
  title: {
    flex: 1
  },
  appbar: {
    paddingBottom: 1
  }
}));

const App = () => {
  const [data, setData] = useState({});
  const [state, setState] = useState({ right: false });
  const [price, setPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const [inventory, setInventory] = useState({
    "12064273040195392": {
      S: 0,
      M: 3,
      L: 1,
      XL: 2
    },
    "51498472915966370": {
      S: 0,
      M: 2,
      L: 3,
      XL: 2
    }
  });
  const updateInventory = (sku, size, operation) => {
    for (var key in inventory) {
      if (key === sku.toString()) {
        let newObj;
        if (operation === "subtract") {
          if (size === "Small") {
            newObj = inventory[key];
            newObj["S"] = inventory[key]["S"] - 1;
          } else if (size === "Medium") {
            newObj = inventory[key];
            newObj["M"] = inventory[key]["M"] - 1;
          } else if (size === "Large") {
            newObj = inventory[key];
            newObj["L"] = inventory[key]["L"] - 1;
          } else if (size === "Xtra Large") {
            newObj = inventory[key];
            newObj["XL"] = inventory[key]["XL"] - 1;
          }
        }
        if (operation === "add") {
          if (size === "Small") {
            newObj = inventory[key];
            newObj["S"] = inventory[key]["S"] + 1;
          } else if (size === "Medium") {
            newObj = inventory[key];
            newObj["M"] = inventory[key]["M"] + 1;
          } else if (size === "Large") {
            newObj = inventory[key];
            newObj["L"] = inventory[key]["L"] + 1;
          } else if (size === "Xtra Large") {
            newObj = inventory[key];
            newObj["XL"] = inventory[key]["XL"] + 1;
          }
        }
        let newInv = inventory;
        newInv[key] = newObj;
        setInventory(newInv);
      }
    }
  };
  const addToCart = (product, size) => {
    updateInventory(product.sku, size, "subtract");
    let exists = false;
    cart.forEach(item => {
      if (product.sku === item.product.sku && size === item.size) {
        item.quantity += 1;
        exists = true;
      }
    });
    if (exists) {
      setState({ ...state, right: true });
      setPrice(price + product.price);
    } else {
      let newItem = { product: product, size: size, quantity: 1 };
      let newCart = cart.push(newItem);
      setPrice(Math.round((price + product.price) * 100) / 100);
      setState({ ...state, right: true });
      setCart((cart: newCart));
    }
  };
  const removeFromCart = (product, size) => {
    updateInventory(product.sku, size, "add");
    let removeindex = 0;
    let remove = false;
    const newCart = cart.forEach((item, index) => {
      if (product.sku === item.product.sku && size === item.size) {
        item.quantity = item.quantity - 1;
        if (item.quantity === 0) {
          remove = true;
        }
        removeindex = index;
      }
    });
    let update;
    if (remove) {
      update = cart.splice(removeindex, 1);
    } else {
      update = newCart;
    }
    setPrice(Math.round((price - product.price) * 100) / 100);
    setCart((cart: update));
  };
  const filterInventory = sku => {
    for (var key in inventory) {
      if (key === sku.toString()) {
        return inventory[key];
      }
    }
  };
  const products = Object.values(data);
  const classes = useStyles();
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/data/products.json");
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);
  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [side]: open });
  };
  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {cart.map(item => (
          <ListItem key={item.product.sku}>
            <CartItem
              product={item.product}
              size={item.size}
              quantity={item.quantity}
              onClick={removeFromCart}
              cart={cart}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem>
          <h3>Total Price: ${price} </h3>
        </ListItem>
      </List>
    </div>
  );
  const getItemCards = () => {
    const itemCards = products.map(product => (
      <Grid item key={product.sku}>
        <ItemCard
          key={product.sku}
          product={product}
          onClick={addToCart}
          inventory={filterInventory(product.sku)}
          appInventory={inventory}
        />
      </Grid>
    ));
    return itemCards;
  };

  return (
    <div>
      <AppBar position="sticky" style={{ marginBottom: 20 }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            React Clothing
          </Typography>
          <IconButton
            onClick={toggleDrawer("right", true)}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {sideList("right")}
      </Drawer>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          {getItemCards()}
        </Grid>
      </Container>
    </div>
  );
};

export default App;
