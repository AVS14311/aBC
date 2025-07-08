require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const memoryRoutes = require('./routes/memoryRoutes');
const authRoutes = require('./routes/authRoutes');



const checkInactivity = require('./middlewares/inactivityTimer');

const app = express();

 
app.use(cors({
  origin: process.env.FRONTEND_URL || true,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(checkInactivity);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/memories', memoryRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));