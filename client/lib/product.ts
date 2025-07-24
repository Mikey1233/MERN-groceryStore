import axios from "./axios";
import { Product } from "./types/product";

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get("/product");
  return res.data as Product[];
};

