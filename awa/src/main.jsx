import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from './context/ProductContext.js';
import ReactDOM from "react-dom/client";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
createRoot(document.getElementById('root')).render(

  <StrictMode>

    <BrowserRouter>
    <ProductProvider>
    <App />
      </ProductProvider>
    </BrowserRouter>
  </StrictMode>,
)
