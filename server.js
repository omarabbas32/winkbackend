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

// --- Use Routes ---
// Note: This line allows you to serve images directly from the backend if needed
app.use('/images', express.static('src/images')); 
app.use('/api/about', aboutUsRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact-info', contactInfoRoutes);
app.use('/api/team-members', teamMemberRoutes);

// --- Server and Database Connection ---
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB successfully!');
        // Start the server ONLY after a successful database connection
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('Could not connect to MongoDB...', err);
    });
