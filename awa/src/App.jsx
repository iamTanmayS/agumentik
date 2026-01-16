import './App.css'

import ProductList from './components/ProductList'
import { ProductProvider } from './context/ProductContext'
import React from 'react'

export default function App() {
  return (
    <ProductProvider>
      <ProductList />
    </ProductProvider>
  )
}
