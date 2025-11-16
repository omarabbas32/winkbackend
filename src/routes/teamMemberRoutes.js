const express = require('express');
const router = express.Router();
const teamMemberController = require('../controllers/teamMemberController.js');
const { upload, uploadToCloudinary, handleMulterError } = require('../middleware/upload.js');

// Route for /api/team-members
router.route('/')
    .get(teamMemberController.getAllTeamMembers)
    .post(
        upload.single('image'), 
        handleMulterError,
        uploadToCloudinary, 
        teamMemberController.createTeamMember
    );

// Route for /api/team-members/:id
router.route('/:id')
    .get(teamMemberController.getTeamMemberById)
    .put(
        upload.single('image'), 
        handleMulterError,
        uploadToCloudinary, 
        teamMemberController.updateTeamMember
    )
    .delete(teamMemberController.deleteTeamMember);

// Export the router
module.exports = router;