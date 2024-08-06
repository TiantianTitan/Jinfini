// src/components/ProductDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Product } from '../types';
import styles from './ProductDetail.module.css'; // Assuming you have a corresponding CSS module file

import homeIcon from '../logo/Home.png';
import phoneIcon from '../logo/Phone.png';
import menuIcon from '../logo/Menu.png';
import logoIcon from '../logo/logo.png';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`http://localhost:5000/getcake/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('There was an error fetching the product!', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div className={styles.productNotFound}>Product not found</div>;
  }

  return (
    <div>
      <div className={styles.header}>
        <img className={styles.logoIcon} alt='logo' src={logoIcon} />
        <div className={styles.jinfiniParis}>Jinfini Paris</div>
        <div>
          <img className={styles.homeIcon} alt="home" src={homeIcon} />
          <img className={styles.phoneIcon} alt="phone" src={phoneIcon} />
          <img className={styles.menuIcon} alt="menu" src={menuIcon} />
        </div>
      </div>
      <div className={styles.productDetail}>
        <h1>{product.cake_name}</h1>
        <img src={`http://localhost:5000/${product.image}`} alt={product.cake_name} className={styles.productImage} />
        <p>Price: {product.price} €</p>
        <p>Description: {product.description}</p>
        <p>Note: {product.note}</p>
        <p>Vote: {product.vote}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
