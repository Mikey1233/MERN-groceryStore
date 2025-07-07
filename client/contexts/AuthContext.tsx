"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "@/lib/axios"; // assume this is your axios instance
// import axios from 'axios';

type User =  {
  name: string;
  email: string;
  role: "admin" | "customer";
  token: string;
}
type SignUp = {
  name: string;
  email: string;
  password: string;
  adminToken?: string;
  profileImage?: string | null;
}

interface CartItem {
  productId: string;
  name?: string;
  price?: number;
  image?: string;
  quantity: number;
}

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  // register: (name: string, email: string, password: string) => Promise<void>;
  register: (value: SignUp) => Promise<void>;
  logout: () => void;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (product: CartItem) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedCart = localStorage.getItem("cart");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const syncCart = async (cartData: CartItem[]) => {
    if (!user?.token) return;
    try {
      await axios.post(
        "/cart/sync",
        { cart: cartData },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {
      console.error("Cart sync failed", error);
    }
  };

  const login = async (email: string, password: string) => {
    const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const res = await axios.post("/auth/login", { email, password, guestCart });
    const data = res.data;

    setUser({ ...data.user, token: data.token });
    setCart(data.user.cart);
    localStorage.setItem(
      "user",
      JSON.stringify({ ...data.user, token: data.token })
    );
    localStorage.setItem("cart", JSON.stringify(data.user.cart));
  };

  const register = async (value: SignUp) => {
    try {
      const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");
      console.log("🛒 Guest cart", guestCart);

      // Step 1: Upload image to Cloudinary if image exists
      let imageUrl = "";
      console.log(value.profileImage);
      if (value.profileImage) {
        const timestamp = Math.round(Date.now() / 1000);
        const folder = "users";
        const signRes = await axios.post("/uploadImage/upload", {
          paramsToSign: { timestamp, folder },
        });

        // if (!signRes.ok) throw new Error("Failed to get Cloudinary signature");

        const { signature } = signRes.data;

        // Step 1b: Upload image to Cloudinary
        const formData = new FormData();
        formData.append("file", value.profileImage);
        formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
        formData.append("timestamp", timestamp.toString());
        formData.append("folder", folder);
        formData.append("signature", signature);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const uploadData = await uploadRes.json();

        if (!uploadData.secure_url) throw new Error("Image upload failed");

        const rawImageUrl = uploadData.secure_url
          .replace("/upload/", "/upload/f_auto,q_auto/")
          .replace(/\.(jpg|jpeg|png)$/i, ".webp");
        imageUrl = rawImageUrl;
      }

      // Step 2: Add image URL to user data
      const res = await axios.post("/auth/register", {
        // ...value,
        name: value.name,
        email: value.email,
        password: value.email,
        profileImage: imageUrl,
        adminToken: value.adminToken,
        // image: imageUrl,
      });

      const data = res.data;

      setUser({ ...data.user, token: data.token });
      setCart(guestCart);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, token: data.token })
      );
      localStorage.setItem("cart", JSON.stringify(guestCart));

      await syncCart(guestCart);

      return data;
    } catch (err) {
      console.error("❌ Error during register:", err);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
  };

  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item.productId === product.productId
      );
      let updatedCart;
      if (existing) {
        updatedCart = prevCart.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        updatedCart = [...prevCart, product];
      }
      if (user) syncCart(updatedCart);
      return updatedCart;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        cart,
        setCart,
        addToCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
