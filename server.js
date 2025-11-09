require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bookingRoutes = require('./routes/bookings');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/bookings', bookingRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Hotel Booking API',
    version: '1.0.0',
    endpoints: {
      bookings: {
        getAll: 'GET /api/bookings',
        getById: 'GET /api/bookings/:id',
        create: 'POST /api/bookings',
        update: 'PUT /api/bookings/:id',
        delete: 'DELETE /api/bookings/:id',
      },
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   Hotel Booking API Server Started    ║
╠════════════════════════════════════════╣
║  Port: ${PORT}
║  Environment: ${process.env.NODE_ENV || 'development'}
║  Database: exam-claude
╚════════════════════════════════════════╝

API Endpoints:
  GET    /api/bookings          - Get all bookings
  GET    /api/bookings/:id      - Get booking by ID
  POST   /api/bookings          - Create new booking
  PUT    /api/bookings/:id      - Update booking
  DELETE /api/bookings/:id      - Cancel/Delete booking

Server ready at http://localhost:${PORT}
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
