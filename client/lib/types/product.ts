export interface Product {
  _id: string;
  productName: string;
  productDescription: string;
  Amount: number;
  OfferAmount: number;
  productImage: string[];
  category: "fruit" | "vegetable" | "drink" | "dairy" | "bakery" | "grain" ; // default is empty string
  user: string; // MongoDB ObjectId of the user
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  _id: string;
  productName: string;
  productDescription: string;
  Amount: number;
  OfferAmount: number;
  productImage: string[];
  category: "fruit" | "vegetable" | "drink" | "dairy" | "bakery" | "grain" ; // default is empty string
  user: string; // MongoDB ObjectId of the user
  createdAt: string;
  updatedAt: string;
}