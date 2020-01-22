import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  }
}));

export default function CartItem({ product, size, quantity, onClick }) {
  const classes = useStyles();
  const theme = useTheme();
  const remove = () => {
    onClick(product, size);
  };
  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {product.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {product.style}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Size: {size}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Quantity: {quantity}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="remove" onClick={remove}>
            Remove
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={"/data/products/" + product.sku + "_1.jpg"}
        title="Product Image"
      />
    </Card>
  );
}
