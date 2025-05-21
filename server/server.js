const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const animeRoutes = require('./routes/animeRoutes');
const errorHandler = require('./middleware/errorHandler');
const axios = require('axios');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/anime', animeRoutes);

// Products route
app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get('http://www.dummyjson.com/products');
    res.json(response.data.products);
  } catch (error) {
    console.error('Error fetching products:', error.response);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// Error handling middleware
app.use(errorHandler);

// MongoDB Connection
console.log('Connecting to MongoDB:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/animeversedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Could not connect to MongoDB:', err);
    process.exit(1);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 

// filepath: c:\Users\TACSCDA2\Dev\react\AnimeDB\server\server.js
const path = require('path');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all route to serve the React app for any other request
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});