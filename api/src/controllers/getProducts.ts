import { Request, Response } from "express";
import currenciesExchange  from "./currenciesExchanges";

const { Product, Category} = require("../db_connection");

const getProducts = async (req: Request, res: Response) => {
  const {to}=req.query
  const from= "USD"
  try {
    const allProducts = await Product.findAll({include:Category});
    if (typeof from === 'string' && typeof to === 'string'){
      const newPricedProducts = await Promise.all(allProducts.map(async (product: any) => {
        const newPrice = await currenciesExchange(from, to, product.price);
        return { ...product.dataValues, price: newPrice.toLocaleString() };
      }));
      return res.status(200).json(newPricedProducts);
  }
  else return res.status(400).json({ error: "invalid query parameters, please check and try again" })
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getProducts;
