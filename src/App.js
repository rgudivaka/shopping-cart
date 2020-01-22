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
  const [state, setState] = useState({ right: false, cart: [] });
  const [cart, setCart] = useState([]);
  const addToCart = (product, size) => {
    let newItem = { product: product, size: size };
    let newCart = cart.push(newItem);
    console.log(product);
    setCart((cart: newCart));
    setState({ ...state, right: true });
    console.log(cart);
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
            <CartItem product={item.product} size={item.size} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem>Total Price: </ListItem>
      </List>
    </div>
  );

  const itemCards = products.map(product => (
    <Grid item key={product.sku}>
      <ItemCard key={product.sku} product={product} onClick={addToCart} />
    </Grid>
  ));

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
          {itemCards}
        </Grid>
      </Container>
    </div>
  );
};

export default App;
