require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Import Routes ---
const serviceRoutes = require('./src/routes/serviceRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const contactInfoRoutes = require('./src/routes/contactInfoRoutes');
const teamMemberRoutes = require('./src/routes/teamMemberRoutes');
const aboutUsRoutes = require('./src/routes/aboutusRoutes.js');

// ✅ NEW: Import Email Routes
const emailRoutes = require('./src/routes/emailRoutes');

// --- Use Routes ---
app.use('/images', express.static('/images')); 
app.use('/api/about', aboutUsRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact-info', contactInfoRoutes);
app.use('/api/team-members', teamMemberRoutes);

// ✅ NEW: Use Email API Route
app.use('/api/email', emailRoutes);

// --- Server and Database Connection ---
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB successfully!');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('Could not connect to MongoDB...', err);
    });
