// Script to create initial admin user
// Run: node create-admin.js

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/userModel');

const MONGO_URL = process.env.MONGO_URL;

async function createAdmin() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Connected to MongoDB');

        const username = process.argv[2] || 'admin#';
        const password = process.argv[3] || 'admin123##wink';

        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log(`User "${username}" already exists!`);
            process.exit(0);
        }

        // Create admin user
        const user = new User({
            username,
            password,
            role: 'admin'
        });

        await user.save();
        console.log(`✅ Admin user created successfully!`);
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
        console.log('\n⚠️  Please change the password after first login!');
        
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
}

createAdmin();

