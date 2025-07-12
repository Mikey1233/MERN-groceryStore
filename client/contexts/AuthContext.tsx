"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "@/lib/axios"; // assume this is your axios instance
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
// import axios from 'axios';

type User = {
  name: string;
  email: string;
  role: "admin" | "customer";
  token: string;
  profileImage?: string | null;
};
type SignUp = {
  name: string;
  email: string;
  password: string;
  adminToken?: string;
  profileImage?: string | null;
};
type SignIn = {
  email: string;
  password: string;
};

interface CartItem {
  productId: string;
  name?: string;
  price?: number;
  image?: string;
  quantity: number;
}

type AuthContextType = {
  user: User | null;
  login: (value: SignIn) => Promise<User>;
  // register: (name: string, email: string, password: string) => Promise<void>;
  register: (value: SignUp) => Promise<User>;
  logout: () => void;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (product: CartItem) => void;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  // const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedCart = localStorage.getItem("cart");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    if (user)
      { localStorage.setItem("user", JSON.stringify(user));}
    else {
      localStorage.removeItem("user");
      // router.push("/");
    }
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

  const login = async (value: SignIn) => {
    try {
      console.log(value)
      const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const res = await axios.post("/auth/login", {
        email: value.email,
        password: value.password,
        guestCart,
      });
      
       if (!res?.data || res.status !== 200) {
        throw new Error("Error in logging in");
      }
      const data = res.data;
      // console.log(data);
      setUser({ ...data.user, token: data.token });
      setCart(data.user.cart);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, token: data.token })
      );
      localStorage.setItem("cart", JSON.stringify(data.user.cart));
      return data;
    } catch (err) {
      console.error("Error loging user in", err);
    }
  };

  const register = async (value: SignUp): Promise<User> => {
  let uploadedPublicId = "";

  try {
    const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log("🛒 Guest cart", guestCart);

    // Step 1: Upload image to Cloudinary if image exists
    let imageUrl = "";

    if (value.profileImage) {
      if (typeof value.profileImage !== "object" || !(value.profileImage as any instanceof File)) {
        throw new Error("Invalid profile image format");
      }

      // const timestamp = Math.floor(Date.now() / 1000);
      const folder = "users";

      
         const signRes = await axios.post("/uploadImage/upload", {
          folder:  folder ,
        });

      const { signature ,timestamp} = signRes.data;
      console.log(signRes.data)

      if (!process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
        throw new Error("Cloudinary env variables are missing");
      }

        const formData = new FormData();
        formData.append("file", value.profileImage);
        formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
        formData.append("timestamp", timestamp);
        formData.append("folder", folder);
        formData.append("signature", signature);

 
      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      console.log(uploadRes)

      if (!uploadRes.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      const uploadData = await uploadRes.json();
      console.log("✅ Uploaded Image Data:", uploadData);

      if (!uploadData.secure_url) {
        throw new Error("Image upload failed");
      }

      uploadedPublicId = uploadData.public_id;

      // Optimize image URL
      imageUrl = uploadData.secure_url.replace(
        "/upload/",
        "/upload/f_auto,q_auto/"
      );
    }

    // Step 2: Register user
    const res = await axios.post("/auth/register", {
      name: value.name,
      email: value.email,
      password: value.password,
      profileImage: imageUrl || "",
      adminToken: value.adminToken,
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

    return data.user;
  } catch (err) {
    console.error("❌ Error during register:", err);

    // Cleanup Cloudinary image if it was uploaded
    if (uploadedPublicId) {
      try {
        await axios.post("/uploadImage/delete", {
          publicId: uploadedPublicId,
        });
        console.log("🧹 Cleaned up uploaded image from Cloudinary");
      } catch (cleanupErr) {
        console.error("⚠️ Failed to delete image from Cloudinary:", cleanupErr);
      }
    }

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
