import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import multer from 'multer';
import path from 'path';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 创建与MySQL数据库的连接
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root1234',
  database: 'jinfini_db'
});

// 连接到数据库
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// 创建蛋糕表
app.get('/createcakestable', (req, res) => {
  let sql = `CREATE TABLE cakes (
    id int AUTO_INCREMENT,
    category_id int,
    cake_name VARCHAR(255),
    image VARCHAR(255),
    price DECIMAL(10, 2),
    description TEXT,
    note TEXT,
    vote INT,
    PRIMARY KEY(id)
  )`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Cakes table created...');
  });
});

// 配置 Multer 存储
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// 上传图片并添加蛋糕信息
app.post('/addcake', upload.single('image'), (req, res) => {
  const { category_id, cake_name, price, description, note, vote } = req.body;
  const image = req.file ? req.file.path : null;

  let sql = 'INSERT INTO cakes (category_id, cake_name, image, price, description, note, vote) VALUES (?, ?, ?, ?, ?, ?, ?)';
  let values = [category_id, cake_name, image, price, description, note, vote];

  db.query(sql, values, (err, result) => {
    if (err) throw err;
    res.send('Cake added...');
  });
});

// 获取所有蛋糕信息
app.get('/getcakes', (req, res) => {
  let sql = 'SELECT * FROM cakes';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// 设置服务器端口
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
