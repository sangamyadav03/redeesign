import React, { useEffect, useState } from 'react'
import products from '../../data'

const Products = () => {
  const [brand, setBrand] = useState('All Brands')
  const [category, setCategory] = useState('All Categories')
  const [priceRange, setPriceRange] = useState('All Prices')
  const [currentPage, setCurrentPage] = useState(1)
  const [cart, setCart] = useState([])

  const productsPerPage = 12

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || []
    setCart(savedCart)
  }, [])

  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product]
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    alert(`${product.name} added to cart!`)
  }

  const filteredProducts = products.filter(product => {
    const brandMatch =
      brand === 'All Brands' || product.brand === brand

    const categoryMatch =
      category === 'All Categories' || product.category === category

    let priceMatch = true
    if (priceRange === 'Under ₹1000') {
      priceMatch = product.price < 1000
    } else if (priceRange === '₹1000 - ₹5000') {
      priceMatch = product.price >= 1000 && product.price <= 5000
    } else if (priceRange === 'Above ₹5000') {
      priceMatch = product.price > 5000
    }

    return brandMatch && categoryMatch && priceMatch
  })

  useEffect(() => {
    setCurrentPage(1)
  }, [brand, category, priceRange])

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-2">Products</h2>
      <p className="text-gray-400 mb-6">
        Browse and filter products ({filteredProducts.length})
      </p>

      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="p-2 bg-gray-700 rounded"
          >
            <option>All Brands</option>
            <option>Zudio</option>
            <option>Zara</option>
            <option>Louis Vuitton</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 bg-gray-700 rounded"
          >
            <option>All Categories</option>
            <option>Mens</option>
            <option>Womens</option>
            <option>Kids</option>
          </select>

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="p-2 bg-gray-700 rounded"
          >
            <option>All Prices</option>
            <option>Under ₹1000</option>
            <option>₹1000 - ₹5000</option>
            <option>Above ₹5000</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentProducts.map(product => (
          <div key={product.id} className="bg-gray-800 rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="h-56 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-400">{product.category}</p>

              <div className="flex justify-between mt-2">
                <span>₹{product.price}</span>
                <span className="text-yellow-400">★ {product.rating}</span>
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 w-full bg-white text-black py-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-3">
        <button
          onClick={() => setCurrentPage(p => p - 1)}
          disabled={currentPage === 1}
          className="px-4 py-1 bg-gray-700 rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span>{currentPage} / {totalPages}</span>

        <button
          onClick={() => setCurrentPage(p => p + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-1 bg-gray-700 rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Products
