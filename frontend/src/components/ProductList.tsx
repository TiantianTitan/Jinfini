import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../types';
import './ProductList.css'; // 引入CSS文件

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get<Product[]>('http://localhost:5000/getcakes')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  const handleProductClick = (id: number) => {
    // 假设你有一个产品介绍页面 /product/:id
    window.location.href = `/product/${id}`;
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Our choices</h1>
      <div className="product-list">
        {products.map(product => (
          <div 
            key={product.id} 
            className="product-item" 
            onClick={() => handleProductClick(product.id)}
          >
            <img src={`http://localhost:5000/${product.image}`} alt={product.cake_name} className="product-image" />
            <p>{product.cake_name} - {product.price} €</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
