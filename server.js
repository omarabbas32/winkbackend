require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// --- Database Connection ---
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// --- Import Routes ---
const serviceRoutes = require('./src/routes/serviceRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const contactInfoRoutes = require('./src/routes/contactInfoRoutes');
const teamMemberRoutes = require('./src/routes/teamMemberRoutes'); 
const aboutUsRoutes = require('./src/routes/aboutusRoutes.js');

// --- Use About Us Routes ---
app.use('/api/about', aboutUsRoutes);
// --- Use Routes ---
app.use('/images', express.static('src/images'));
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact-info', contactInfoRoutes);
app.use('/api/team-members', teamMemberRoutes);
// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));