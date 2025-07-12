"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Cards from "../Cards";
import { CategoryData } from "@/lib/data";

// Animate children with delay
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Card fade-in and slide
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Home() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false, // 👈 allow reverse animation
    margin: "-100px 0px", // 👈 trigger slightly before it's fully visible
  });

  return (
    <section className="px-6 py-12" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Categories</h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"} // 👈 forward and reverse animation
        >
          {CategoryData.map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 },
              }} // 👈 hover animation
            >
              <Cards
                name={item.name}
                image={item.image}
                bgColor={item.bg}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
