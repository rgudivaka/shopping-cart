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

const ItemCard = product => {
  return (
    <Card variant="outlined">
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Product Image"
          height="140"
          image={"/data/products/" + product.product.sku + "_1.jpg"}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.product.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.product.style}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
        >
          <Button>Small</Button>
          <Button>Medium</Button>
          <Button>Large</Button>
          <Button>XL</Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
