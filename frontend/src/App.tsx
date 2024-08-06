// src/App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import styles from './App.module.css';
import homeIcon from './logo/Home.png';
import phoneIcon from './logo/Phone.png';
import menuIcon from './logo/Menu.png';
import logo from './logo/jinfini.png';
import logoIcon from './logo/logo.png';
import bg_video from './video/show1.mp4';
import bg_video2 from './video/show3.mp4';
import { Product } from './types';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get<Product[]>('http://localhost:5000/getcakes')
      .then((response: { data: Product[] }) => {
        setProducts(response.data);
      })
      .catch((error: any) => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  return (
    <Router basename="/voyage/dessert/frontend">
      <div className={styles.homepage}>
        <div className={styles.header}>
          <img className={styles.logoIcon} alt='logo' src={logoIcon} />
          <div className={styles.jinfiniParis}>Jinfini Paris</div>
          <img className={styles.homeIcon} alt="home" src={homeIcon} />
          <img className={styles.phoneIcon} alt="phone" src={phoneIcon} />
          <img className={styles.menuIcon} alt="menu" src={menuIcon} />
        </div>
        <div className={styles.body}>
          <div className={styles.videoContainer}>
            <div className={styles.bg_text}>Centre commercial de pâtisserie en ligne Jinfini</div>
            <video className={styles.bg_video} src={bg_video} autoPlay loop muted />
            <img className={styles.jinfiniLogo} alt="logo" src={logo} />
            <video className={styles.bg_video2} src={bg_video2} autoPlay loop muted />
            <div className={styles.bg_text2}>Choose what you want, do what you love.</div>
          </div>
          <div className={styles.products}>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
