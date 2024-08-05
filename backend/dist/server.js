"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mysql_1 = __importDefault(require("mysql"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
// 创建与MySQL数据库的连接
const db = mysql_1.default.createConnection({
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
        if (err)
            throw err;
        res.send('Cakes table created...');
    });
});
// 配置 Multer 存储
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage: storage });
// 上传图片并添加蛋糕信息
app.post('/addcake', upload.single('image'), (req, res) => {
    const { category_id, cake_name, price, description, note, vote } = req.body;
    const image = req.file ? req.file.path : null;
    let sql = 'INSERT INTO cakes (category_id, cake_name, image, price, description, note, vote) VALUES (?, ?, ?, ?, ?, ?, ?)';
    let values = [category_id, cake_name, image, price, description, note, vote];
    db.query(sql, values, (err, result) => {
        if (err)
            throw err;
        res.send('Cake added...');
    });
});
// 获取所有蛋糕信息
app.get('/getcakes', (req, res) => {
    let sql = 'SELECT * FROM cakes';
    db.query(sql, (err, results) => {
        if (err)
            throw err;
        res.json(results);
    });
});
// 设置服务器端口
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
