import React from 'react'
import { useProducts } from '../context/ProductContext'

export default function ProductList() {
  const { products, loading } = useProducts()

  if (loading) {
    return <div className="container"><p>Loading...</p></div>
  }

  return (
    <div className="container">
      <h1>Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <h2>{product.name}</h2>
            <p className="price">₹{product.price}</p>
            <p className="stock">Stock: {product.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
