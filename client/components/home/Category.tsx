import { CategoryData } from '@/lib/data'
import React from 'react'
import Cards from '../Cards'

function Category() {
  return (
     <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {CategoryData.map((item, i) => (
              <Cards
                name={item.name}
                key={i}
                image={item.image}
                bgColor={item.bg}
              />
            ))}
          </div>
        </div>
      </section>

  )
}

export default Category