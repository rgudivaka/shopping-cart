import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  Button,
  ButtonGroup
} from "@material-ui/core";

const ItemCard = ({ product, onClick }) => {
  const add = size => {
    onClick(product, size);
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
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
        >
          <Button onClick={add}>Small</Button>
          <Button onClick={add}>Medium</Button>
          <Button onClick={add}>Large</Button>
          <Button onClick={add}>XL</Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
