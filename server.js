require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// --- Middlewares ---
// CORS configuration - allow all origins for development
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form data

// --- Import Routes ---
const authRoutes = require('./src/routes/authRoutes');
const serviceRoutes = require('./src/routes/serviceRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const contactInfoRoutes = require('./src/routes/contactInfoRoutes');
const teamMemberRoutes = require('./src/routes/teamMemberRoutes');
const aboutUsRoutes = require('./src/routes/aboutusRoutes.js');


// ✅ NEW: Import Email Routes
const emailRoutes = require('./src/routes/emailRoutes');

// Import Auth Middleware
const { authenticate } = require('./src/middleware/auth');

// --- Use Routes ---
app.use('/images', express.static('/images')); 
app.use(express.static('public')); // Serve static files from public directory

// Auth routes (public)
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/about', authenticate, aboutUsRoutes);
app.use('/api/services', authenticate, serviceRoutes);
app.use('/api/projects', authenticate, projectRoutes);
app.use('/api/contact-info', authenticate, contactInfoRoutes);
app.use('/api/team-members', authenticate, teamMemberRoutes);
app.use('/api/email', emailRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    if (!res.headersSent) {
        res.status(err.status || 500).json({
            message: err.message || 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? err.stack : {}
        });
    }
});

// Handle connection aborted errors gracefully
process.on('uncaughtException', (err) => {
    if (err.message !== 'aborted' && err.code !== 'ECONNRESET') {
        console.error('Uncaught Exception:', err);
    }
});

process.on('unhandledRejection', (reason, promise) => {
    if (reason && reason.message !== 'aborted' && reason.code !== 'ECONNRESET') {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    }
});

// --- Server and Database Connection ---
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB successfully!');
        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Dashboard: http://localhost:${PORT}/dashboard.html`);
        });
        
        // Handle server errors
        server.on('error', (err) => {
            if (err.code !== 'ECONNRESET' && err.message !== 'aborted') {
                console.error('Server error:', err);
            }
        });
    })
    .catch(err => {
        console.error('Could not connect to MongoDB...', err);
    });
