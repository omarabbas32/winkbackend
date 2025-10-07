const ContactInfo = require('../models/contactInfoModel');

// GET the contact info document
exports.getContactInfo = async (req, res) => {
    try {
        // findOne() gets the first (and only) document in the collection
        const info = await ContactInfo.findOne();
        if (!info) {
             // If no info exists yet, you can send a default or create one
            return res.status(404).json({ message: 'Contact information not found.' });
        }
        res.json(info);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE the contact info document
exports.updateContactInfo = async (req, res) => {
    try {
        // Find the single document and update it. 
        // { new: true } returns the updated version.
        // { upsert: true } creates the document if it doesn't already exist.
        const updatedInfo = await ContactInfo.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(updatedInfo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};