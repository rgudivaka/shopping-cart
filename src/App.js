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
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
const useStyles = makeStyles(theme => ({
  title: {
    flex: 1
  },
  appbar: {
    paddingBottom: 1
  }
}));
const uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};
const firebaseConfig = {
  apiKey: "AIzaSyBYxiWCaBqlpEk4oTdzJaxk5iz8rVt1CbA",
  authDomain: "react-shopping-cart-62d0e.firebaseapp.com",
  databaseURL: "https://react-shopping-cart-62d0e.firebaseio.com",
  projectId: "react-shopping-cart-62d0e",
  storageBucket: "react-shopping-cart-62d0e.appspot.com",
  messagingSenderId: "450215667642",
  appId: "1:450215667642:web:c97e0be213cc619ca91f83",
  measurementId: "G-EPTTNE87WJ"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();
const App = () => {
  const [data, setData] = useState({});
  const [state, setState] = useState({ right: false });
  const [price, setPrice] = useState(0);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [inventory, setInventory] = useState(undefined);
  const Welcome = ({ user }) => (
    <>
      Welcome, {user.displayName}
      <IconButton onClick={() => firebase.auth().signOut()}>
        <Button variant="contained" color="secondary">
          Log out
        </Button>
      </IconButton>
    </>
  );
  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);
  const SignIn = () => (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  );
  const addToCart = (product, size) => {
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
  const products = Object.values(data);
  const classes = useStyles();
  useEffect(() => {
    db.once("value").then(snap => {
      setInventory(snap.val());
    });
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
              inventory={{ inventory: inventory, setInventory: setInventory }}
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
  const itemCards = products.map(product => (
    <Grid item key={product.sku}>
      <ItemCard
        key={product.sku}
        product={product}
        onClick={addToCart}
        inv={{ inventory: inventory, setInventory: setInventory }}
      />
    </Grid>
  ));

  return (
    <div>
      <AppBar position="sticky" style={{ marginBottom: 20 }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            React Clothing
          </Typography>
          {user ? <Welcome user={user} /> : <SignIn />}
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
