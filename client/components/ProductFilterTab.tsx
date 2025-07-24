// components/ProductFilterTabs.tsx
interface Props {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

export default function ProductFilterTabs({ categories, selectedCategory, setSelectedCategory }: Props) {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`cursor-pointer px-4 py-2 text-sm border rounded hover:bg-gray-500 hover:text-white transition ${
            selectedCategory === cat
              ? "bg-gradient-to-br from-green-400 to-green-600  text-white "
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
}
