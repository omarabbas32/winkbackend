const TeamMember = require('../models/teamMemberModel.js');

// CREATE a new team member
exports.createTeamMember = async (req, res) => {
    const member = new TeamMember({
        name: req.body.name,
        jobTitle: req.body.jobTitle,
        imagePath: req.body.imagePath,
    });
    try {
        const newMember = await member.save();
        res.status(201).json(newMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// GET all team members
exports.getAllTeamMembers = async (req, res) => {
    try {
        const members = await TeamMember.find();
        res.status(200).json(members);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET a single team member by ID
exports.getTeamMemberById = async (req, res) => {
    try {
        const member = await TeamMember.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ message: 'Team member not found' });
        }
        res.status(200).json(member);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE a team member by ID
exports.updateTeamMember = async (req, res) => {
    try {
        const updatedMember = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMember) {
            return res.status(404).json({ message: 'Team member not found' });
        }
        res.status(200).json(updatedMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE a team member by ID
exports.deleteTeamMember = async (req, res) => {
    try {
        const member = await TeamMember.findByIdAndDelete(req.params.id);
        if (!member) {
            return res.status(44).json({ message: 'Team member not found' });
        }
        res.status(200).json({ message: 'Deleted Team Member' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};