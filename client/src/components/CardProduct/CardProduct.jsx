import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import style from "./CardProduct.module.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useShowProductStore } from "../../store/showProduct";
import { useCartStore } from "../../store/shoppingCartStore";
import { Link } from "react-router-dom";

export const CardProduct = ({ product }) => {
  const { productById } = useShowProductStore();
  const { addProductToCart, deleteProductFromCart , shoppingCart } = useCartStore();
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 300,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440,
        xxl: 1800,
      },
    },
  });

  const [isFav, setFav] = useState(false);
  const [cart, setCart] = useState(false);

  useEffect(() => {
    setCart(shoppingCart.find( element => element.id_product === product.id_product) ? true : false);
  }, [shoppingCart, product]);

  const handleFav = () => {
    setFav(!isFav);
    // Aquí puedes implementar la lógica para agregar/quitar favoritos si es necesario
  };

  const handleProductId = (id) => {
    productById(id);
  };

  const handleCart = () => {
    if(cart){
      deleteProductFromCart(product)
    }else{
      addProductToCart(product)
    }
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          bgcolor: "transparent",
          width: {
            xs: "20rem",
            sm: "16.4rem",
            md: "16rem",
            lg: "17rem",
            xl: "17rem",
            xxl: "19rem",
          },
          margin: {
            xs: "0",
            sm: "2rem",
            md: "1rem",
            lg: "0.75rem",
            xl: "0.75rem",
            xxl: "0.75rem",
          },
          marginTop: { xs: "1rem" },
        }}
      >
        <Link
          onClick={() => handleProductId(product.id_product)}
          to={"/product-detail"}
        >
          <CardMedia
            sx={{
              height: 300,
            }}
            image={product.image}
            title={product.name}
          />
        </Link>
        <CardContent className={style.card_txt}>
          <Link
            style={{ textDecoration: "none", color: "#bfbfbf" }}
            onClick={() => handleProductId(product.id_product)}
            to={"/product-detail"}
          >
            <Typography
              className={style.name_product}
              gutterBottom
              variant="p"
              component="div"
              sx={{ fontWeight: "bold", textTransform: "uppercase" }}
            >
              {product.name}
            </Typography>
          </Link>
          <Typography
            className={style.price_product}
            variant="p"
            component="div"
          >
            $ {product.price}
          </Typography>
          <div className={style.icons}>
            {isFav ? (
              <FavoriteOutlinedIcon fontSize="large" onClick={handleFav} />
            ) : (
              <FavoriteBorderOutlinedIcon
                fontSize="large"
                onClick={handleFav}
              />
            )}
            <div className={style.cart}>
              {cart ? (
                <ShoppingCartIcon fontSize="large" onClick={handleCart} />
              ) : (
                <ShoppingCartOutlinedIcon
                  fontSize="large"
                  onClick={handleCart}
                />
              )}
              <div className={style.plus}>
                {cart ? (
                  <RemoveCircleIcon fontSize="small" onClick={handleCart} />
                ) : (
                  <AddCircleIcon fontSize="small" onClick={handleCart} />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};