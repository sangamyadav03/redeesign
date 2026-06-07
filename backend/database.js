const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbDir = path.join(__dirname, 'data');
const dbPath = path.join(dbDir, 'zudio.db');

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    amount REAL NOT NULL,
    quantity INTEGER NOT NULL,
    deliveryOption TEXT,
    deliveryDate TEXT,
    deliveryMode TEXT,
    sender TEXT,
    receiver TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

const seedProducts = db.prepare('SELECT COUNT(*) as count FROM products');
if (seedProducts.get().count === 0) {
  const insertProduct = db.prepare(`
    INSERT INTO products (title, price, category, image, description)
    VALUES (?, ?, ?, ?, ?)
  `);

  const products = [
    {
      title: 'Aurora Lounge Set',
      price: 1299,
      category: 'Women',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80',
      description: 'Soft knit loungewear with a minimal chic finish for everyday comfort.',
    },
    {
      title: 'City Pulse Jacket',
      price: 1599,
      category: 'Men',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
      description: 'Lightweight utility jacket built for urban mornings and weekend escapes.',
    },
    {
      title: 'Playful Pop Sneakers',
      price: 1099,
      category: 'Kids',
      image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=400&q=80',
      description: 'Colorful sneakers with extra cushioning for active play all day.',
    },
    {
      title: 'Sculpted Essentials Bag',
      price: 899,
      category: 'Accessories',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
      description: 'A compact bag with smart storage and a clean modern look.',
    },
  ];

  const insertMany = db.transaction((items) => {
    for (const product of items) {
      insertProduct.run(product.title, product.price, product.category, product.image, product.description);
    }
  });

  insertMany(products);
}

module.exports = db;
