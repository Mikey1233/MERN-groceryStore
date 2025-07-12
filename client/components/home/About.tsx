"use client";

import {
  Calendar,
  Clock,
  Gift,
  Users,
  Utensils,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Animation settings
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6},
  },
};

// Box data
const features = [
  {
    title: "Menu Customization",
    gradient: "from-purple-400 to-purple-600",
    content: (
      <>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
            <Utensils className="w-6 h-6 text-yellow-900" />
          </div>
          <div>
            <h4 className="font-semibold">Pasta Primavera</h4>
            <p className="text-sm opacity-90">Customized for dietary needs</p>
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          <span className="px-3 py-1 bg-green-500 rounded-full text-xs">Gluten-Free</span>
          <span className="px-3 py-1 bg-blue-500 rounded-full text-xs">Vegan</span>
        </div>
        <p className="text-sm opacity-90">
          Personalize every dish to match your dietary preferences and taste
        </p>
      </>
    ),
  },
  {
    title: "Easy Reservations",
    gradient: "from-pink-400 to-pink-600",
    content: (
      <>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm">Select your date & time</span>
          <Calendar className="w-5 h-5" />
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-sm mb-4">
          <div className="bg-white/30 rounded-lg py-2">7:00 PM</div>
          <div className="bg-white rounded-lg py-2 text-pink-600 font-semibold">7:30 PM</div>
          <div className="bg-white/30 rounded-lg py-2">8:00 PM</div>
        </div>
        <p className="text-sm opacity-90">
          Book your table instantly with our smart reservation system
        </p>
      </>
    ),
  },
  {
    title: "Loyalty Rewards",
    gradient: "from-green-400 to-green-600",
    content: (
      <>
        <div className="text-center mb-4">
          <div className="text-3xl font-bold mb-2">$45.50</div>
          <div className="text-sm opacity-90 mb-3">Available Balance</div>
          <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
            Gold Member
          </div>
        </div>
        <p className="text-sm opacity-90">
          Earn points with every visit and unlock exclusive rewards
        </p>
      </>
    ),
  },
  {
    title: "Guest Reviews",
    gradient: "from-yellow-400 to-yellow-600",
    content: (
      <>
        <div className="space-y-3 mb-4">
          {[
            { initials: "JD", name: "John D.", review: "⭐⭐⭐⭐⭐ Amazing pasta!" },
            { initials: "SM", name: "Sarah M.", review: "⭐⭐⭐⭐⭐ Perfect service" },
          ].map((r, i) => (
            <div className="flex items-center gap-3" key={i}>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
                {r.initials}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{r.name}</div>
                <div className="text-xs opacity-90">{r.review}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm opacity-90">
          Read what our guests say and share your experience
        </p>
      </>
    ),
  },
  {
    title: "Catering Services",
    gradient: "from-orange-400 to-orange-600",
    content: (
      <>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { icon: <Users className="w-6 h-6 mx-auto mb-2" />, label: "Corporate" },
            { icon: <Gift className="w-6 h-6 mx-auto mb-2" />, label: "Weddings" },
            { icon: <Calendar className="w-6 h-6 mx-auto mb-2" />, label: "Events" },
            { icon: <Utensils className="w-6 h-6 mx-auto mb-2" />, label: "Private" },
          ].map((item, i) => (
            <div key={i} className="bg-white/30 rounded-lg p-3 text-center">
              {item.icon}
              <div className="text-xs font-semibold">{item.label}</div>
            </div>
          ))}
        </div>
        <p className="text-sm opacity-90">
          Let us cater your special events with our signature dishes
        </p>
      </>
    ),
  },
  {
    title: "Special Events",
    gradient: "from-blue-400 to-blue-600",
    content: (
      <>
        <div className="text-center mb-4">
          <div className="bg-white/30 rounded-lg p-3 mb-3">
            <Clock className="w-8 h-8 mx-auto mb-2" />
            <div className="text-sm font-semibold">Wine Tasting</div>
            <div className="text-xs opacity-90">Every Friday 7 PM</div>
          </div>
          <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
            Book Now
          </div>
        </div>
        <p className="text-sm opacity-90">
          Join our exclusive events and culinary experiences
        </p>
      </>
    ),
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <section className="py-16 px-4 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About FoodCart</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience culinary excellence with our innovative dining features designed to make every visit memorable
          </p>
        </div>

        {/* Feature Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              className={`bg-gradient-to-br ${item.gradient} rounded-3xl p-8 text-white relative overflow-hidden`}
            >
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-6">
                {item.content}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Highlights */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            At FoodCart, we combine traditional flavors with modern innovation to create unforgettable dining experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["🍝 Authentic Italian", "🌿 Farm-to-Table", "🍷 Wine Pairings", "👨‍🍳 Chef's Specials"].map((text, i) => (
              <div key={i} className="bg-white rounded-full px-6 py-3 shadow-md">
                <span className="text-gray-700 font-semibold">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
