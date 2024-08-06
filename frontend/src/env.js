// src/env.js
const isProd = process.env.NODE_ENV === 'production';

export const PUBLIC_URL = isProd
  ? '/voyage/dessert/frontend'
  : '';
