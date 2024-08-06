// src/components/ProductList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import styles from './ProductList.module.css'; // 使用 CSS 模块

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

  return (
    <div className={styles.productList}>
      {products.map(product => (
        <Link to={`/product/${product.id}`} key={product.id} className={styles.card}>
          <div className={styles.cardImageContainer}>
            <img src={`http://localhost:5000/${product.image}`} alt={product.cake_name} className={styles.cardImage} />
          </div>
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>{product.cake_name}</h2>
            <p className={styles.cardPrice}>{product.price} €</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
