const express = require('express');
const router = express.Router();
const teamMemberController = require('../controllers/teamMemberController.js');

// Route for /api/team-members
router.route('/')
    .get(teamMemberController.getAllTeamMembers)
    .post(teamMemberController.createTeamMember);

// Route for /api/team-members/:id
router.route('/:id')
    .get(teamMemberController.getTeamMemberById)
    .put(teamMemberController.updateTeamMember)
    .delete(teamMemberController.deleteTeamMember);

// Export the router
module.exports = router;