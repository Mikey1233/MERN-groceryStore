// --- BACKEND: Node.js + Express + MongoDB (with Mongoose) ---

// models/User.ts
import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true },
  addedAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
  cart: [cartItemSchema],
});

export default mongoose.model('User', userSchema);

// middleware/auth.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = await User.findById(decoded.id);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role === 'admin') return next();
  res.status(403).json({ message: 'Access denied' });
};

// routes/auth.ts
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '30d' });
  res.json({ token, user });
});

router.post('/login', async (req, res) => {
  const { email, password, guestCart } = req.body;
  const user = await User.findOne({ email }).populate('cart.product');
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  // Merge carts
  const mergedCart = mergeCarts(user.cart, guestCart);
  user.cart = mergedCart;
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '30d' });
  res.json({ token, user });
});

function mergeCarts(serverCart: any[], guestCart: any[]) {
  const map = new Map();
  [...serverCart, ...guestCart].forEach(item => {
    const id = item.product._id?.toString() || item.product;
    const existing = map.get(id);
    if (existing) existing.quantity += item.quantity;
    else map.set(id, { ...item, product: id });
  });
  return Array.from(map.values());
}

// routes/cart.ts
router.get('/', protect, async (req, res) => {
  const user = await User.findById(req.user._id).populate('cart.product');
  res.json(user?.cart);
});

router.post('/sync', protect, async (req, res) => {
  const { cart } = req.body;
  const user = await User.findById(req.user._id);
  user.cart = mergeCarts(user.cart, cart);
  await user.save();
  res.json(user.cart);
});

export default router;


// --- FRONTEND: Next.js + TypeScript ---

// context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('user') || 'null');
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (stored) setUser(stored);
    setCart(storedCart);
  }, []);

  const login = async (email: string, password: string) => {
    const guestCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, guestCart })
    });
    const data = await res.json();
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
    setCart(data.user.cart);
    localStorage.setItem('cart', JSON.stringify(data.user.cart));
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
  };

  const addToCart = (item) => {
    const existing = cart.find((c) => c.product === item.product);
    const updatedCart = existing
      ? cart.map(c => c.product === item.product ? { ...c, quantity: c.quantity + item.quantity } : c)
      : [...cart, item];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    if (user) syncCart(updatedCart);
  };

  const syncCart = async (newCart) => {
    await fetch('/api/cart/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user?.token}`
      },
      body: JSON.stringify({ cart: newCart })
    });
  };

  return (
    <AuthContext.Provider value={{ user, cart, login, logout, addToCart }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
