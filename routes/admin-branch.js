const express = require('express');
const session = require('express-session');
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Middleware function to check if the user is an admin
const isAdmin = (req, res, next) => {
  const admin = req.session.admin; // Assuming you have the user information stored in the session
  if (admin && admin.usertype === 'Admin') {
    next(); // User is an admin, proceed to the next middleware/route handler
  } else {
    res.status(403).send('Forbidden'); // User is not an admin, send a forbidden error
  }
};

/* GET admin dashboard. */
router.get('/admin-branch', isAdmin, async (req, res, next) => {
  try {

    res.render('admin-branch', { title: 'Express' });
  } catch (error) {
    console.error('Error fetching user records:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
