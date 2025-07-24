"use client";

import { Suspense, useRef, useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/product";
import ProductRating from "@/components/ProductRating";
import ProductFilterTabs from "@/components/ProductFilterTab";
import { motion, useInView } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const categories = ["all", "fruit", "vegetable", "drink", "dairy", "bakery", "grain"];

// Extracted inner component to wrap with Suspense
function ProductContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px 0px" });

  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const url = new URLSearchParams();
    if (selectedCategory !== "all") url.set("category", selectedCategory);
    router.push(`/products?${url.toString()}`);
  }, [selectedCategory]);

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch = item.productName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [data, selectedCategory, searchQuery]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    return filteredData.slice(start, start + productsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / productsPerPage);

  if (error) return <p>Something went wrong</p>;

  return (
    <section className="px-2 py-12" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Products</h2>

        <input
          type="text"
          placeholder="Search by name or keyword"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2 border border-gray-300 px-4 py-2 rounded mb-4"
          // className="mb-6 w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <ProductFilterTabs
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={(cat) => {
            setSelectedCategory(cat);
            setCurrentPage(1);
          }}
        />

        {paginatedData.length === 0 ? (
          <p className="text-gray-500 mt-8 text-center">No products found.</p>
        ) : (
          <motion.div
            className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-8 px-3 md:px-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {paginatedData.map((item, i) => (
              <motion.div
                key={i}
                className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%] max-w-xs"
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <ProductRating
                  productName={item.productName}
                  OfferAmount={item.OfferAmount}
                  Amount={item.Amount}
                  image={item.productImage[0]}
                  category={item.category}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {filteredData.length > productsPerPage && (
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-4 py-2 border rounded disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="text-gray-600 mt-1">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-4 py-2 border rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// Final wrapper component with suspense
export default function ProductPage() {
  return (
    <Suspense fallback={<p className="p-4 text-center">Loading...</p>}>
      <ProductContent />
    </Suspense>
  );
}
