import { BestSellers } from '@/lib/data'
import React from 'react'
import ProductRating from '../ProductRating'

function BestSeller() {
  return (
     <section className="px-6 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Best Sellers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BestSellers.map((item, i) => (
              <ProductRating
                key={i}
                productName={item.name}
                OfferAmount={item.slashPrice}
                Amount={item.price}
                category={item.category}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </section>
  )
}

export default BestSeller