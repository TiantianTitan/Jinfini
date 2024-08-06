// src/components/ProductDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Product } from '../types';
import styles from './ProductDetail.module.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios.get<Product>(`http://localhost:5000/getcake/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the product!', error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.productDetail}>
      <h1>{product.cake_name}</h1>
      <img src={`http://localhost:5000/${product.image}`} alt={product.cake_name} className={styles.productImage} />
      <p>{product.price} €</p>
      <p>{product.description}</p>
      <p>{product.note}</p>
      <p>{product.vote}</p>
    </div>
  );
};

export default ProductDetail;
