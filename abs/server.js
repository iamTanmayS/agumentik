const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const config = require('./src/config/config');
const productRoutes = require('./src/routes/productRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

const app = express();

connectDB();

app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


