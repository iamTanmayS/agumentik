const mongoose = require('mongoose');
const config = require('./src/config/config');
const Product = require('./src/models/productModel');

const seedProducts = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('Database connected');

    
    await Product.deleteMany({});
    console.log('Cleared existing products');

    
    const sampleProducts = [
      {
        name: 'Laptop',
        quantity: 10,
        price: 999.99,
        category: 'Electronics'
      },
      {
        name: 'Mouse',
        quantity: 50,
        price: 29.99,
        category: 'Electronics'
      },
      {
        name: 'Keyboard',
        quantity: 30,
        price: 79.99,
        category: 'Electronics'
      },
      {
        name: 'Monitor',
        quantity: 15,
        price: 299.99,
        category: 'Electronics'
      },
      {
        name: 'USB Cable',
        quantity: 100,
        price: 9.99,
        category: 'Accessories'
      }
    ];

    const result = await Product.insertMany(sampleProducts);
    console.log(`${result.length} products added successfully`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedProducts();
