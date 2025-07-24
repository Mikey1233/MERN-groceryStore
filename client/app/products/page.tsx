"use client"; 

// Import necessary dependencies and components
import { useQuery } from "@tanstack/react-query"; // For fetching data with caching and loading states
import { fetchProducts } from "@/lib/product"; // Function to fetch product data from backend
import ProductRating from "@/components/ProductRating"; // Component for displaying individual product details
import ProductFilterTabs from "@/components/ProductFilterTab"; // Tabs for filtering products by category
import { motion, useInView } from "framer-motion"; // Framer Motion for animations and scroll-based effects
import { useRef, useState, useMemo, useEffect } from "react"; // React hooks
import { useSearchParams, useRouter } from "next/navigation"; // Next.js hooks for navigation and URL params

// Animation container variants: stagger children elements
const containerVariants = {
  hidden: {}, // Initial hidden state
  visible: {
    transition: {
      staggerChildren: 0.2, // Animate child elements with 0.2s delay between them
    },
  },
};

// Animation for individual product cards
const cardVariants = {
  hidden: { opacity: 0, y: 30 }, // Start slightly below and invisible
  visible: {
    opacity: 1, // Fade in
    y: 0, // Slide up
    transition: { duration: 0.5 }, // Duration of animation
  },
};

// List of supported product categories
const categories = ["all", "fruit", "vegetable", "drink", "dairy", "bakery", "grain"];

function ProductPage() {
  const ref = useRef(null); // Ref to track visibility of the section for animation
  const isInView = useInView(ref, { once: false, margin: "-100px 0px" }); // Tracks if section is in viewport with offset

  const router = useRouter(); // Router to navigate programmatically
  const searchParams = useSearchParams(); // Access URL search parameters
  const initialCategory = searchParams.get("category") || "all"; // Get category from URL or default to "all"

  const [selectedCategory, setSelectedCategory] = useState(initialCategory); // Current selected category
  const [searchQuery, setSearchQuery] = useState(""); // Input search query
  const [currentPage, setCurrentPage] = useState(1); // Pagination: current page
  const productsPerPage = 8; // Number of products to show per page

  // Update URL when category changes
  useEffect(() => {
    const url = new URLSearchParams();
    if (selectedCategory !== "all") url.set("category", selectedCategory);
    router.push(`/products?${url.toString()}`);
  }, [selectedCategory]);

  // Fetch product data using React Query
  const { data = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Filter products by category and search query
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch = item.productName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [data, selectedCategory, searchQuery]);

  // Paginate the filtered data
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    return filteredData.slice(start, start + productsPerPage);
  }, [filteredData, currentPage]);

  // Total number of pages based on filtered data length
  const totalPages = Math.ceil(filteredData.length / productsPerPage);

  // Display error message if data fetching fails
  if (error) return <p>Something went wrong</p>;

  return (
    <section className="px-2 py-12" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Products</h2>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name or keyword"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page on new search
          }}
          className="mb-6 w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Category Filter Tabs */}
        <ProductFilterTabs
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={(cat) => {
            setSelectedCategory(cat);
            setCurrentPage(1); // Reset pagination on category change
          }}
        />

        {/* No products found message */}
        {paginatedData.length === 0 ? (
          <p className="text-gray-500 mt-8 text-center">No products found.</p>
        ) : (
          // Animated product cards container
          <motion.div
            className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-8 px-3 md:px-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"} // Animate only if in view
          >
            {/* Loop through paginated products */}
            {paginatedData.map((item, i) => (
              <motion.div
                key={i}
                className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%] max-w-xs"
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 },
                }} // Add scale animation on hover
              >
                <ProductRating
                  productName={item.productName}
                  OfferAmount={item.OfferAmount}
                  Amount={item.Amount}
                  image={item.productImage[0]} // Use the first image in the array
                  category={item.category}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination Controls */}
        {filteredData.length > productsPerPage && (
          <div className="flex justify-center mt-8 gap-4">
            {/* Previous button */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-4 py-2 border rounded disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {/* Current page indicator */}
            <span className="text-gray-600 mt-1">
              Page {currentPage} of {totalPages}
            </span>

            {/* Next button */}
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

export default ProductPage;

