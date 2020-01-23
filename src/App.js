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
    },
    "10686354557628304": {
      S: 1,
      M: 2,
      L: 2,
      XL: 1
    },
    "11033926921508488": {
      S: 3,
      M: 2,
      L: 0,
      XL: 1
    },
    "39876704341265610": {
      S: 2,
      M: 0,
      L: 0,
      XL: 0
    },
    "10412368723880252": {
      S: 3,
      M: 2,
      L: 2,
      XL: 2
    },
    "8552515751438644": {
      S: 2,
      M: 0,
      L: 0,
      XL: 2
    },
    "18644119330491310": {
      S: 3,
      M: 3,
      L: 2,
      XL: 0
    },
    "11854078013954528": {
      S: 1,
      M: 1,
      L: 1,
      XL: 0
    },
    "876661122392077": {
      S: 3,
      M: 1,
      L: 0,
      XL: 1
    },
    "9197907543445676": {
      S: 3,
      M: 3,
      L: 1,
      XL: 2
    },
    "10547961582846888": {
      S: 2,
      M: 2,
      L: 0,
      XL: 0
    },
    "6090484789343891": {
      S: 2,
      M: 0,
      L: 2,
      XL: 3
    },
    "18532669286405344": {
      S: 2,
      M: 3,
      L: 0,
      XL: 2
    },
    "5619496040738316": {
      S: 1,
      M: 3,
      L: 3,
      XL: 2
    },
    "11600983276356164": {
      S: 3,
      M: 3,
      L: 3,
      XL: 1
    },
    "27250082398145996": {
      S: 1,
      M: 0,
      L: 0,
      XL: 2
    }
  });
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
