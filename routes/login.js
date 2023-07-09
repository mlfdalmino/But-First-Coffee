const express = require('express');
const session = require('express-session');
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const crypto = require('crypto');
const prisma = new PrismaClient();


// Initialize the session middleware
router.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));


/* GET home page. */
router.get('/login', async function(req, res, next) {
  // If user is already logged in, redirect to appropriate page
  if (req.session.admin) {
    res.redirect("/admin");
    return;
  }

  // Otherwise, render the login page
  res.render('login', { title: 'Login' });
});

/* POST login. */
router.post('/login', async function(req, res, next) {
  const { admin_email, admin_password } = req.body;
  try {
    const admin = await prisma.admin.findUnique({
      where: { admin_email: admin_email }
    });

    if (!admin) {
      res.status(401).render('login', { title: 'Login', errorMessage: 'Invalid email or password' });
      return;
    }

    // Encrypt the password entered by the user
    const encryptedPassword = crypto.createHash('sha256').update(admin_password).digest('hex');

    if (admin.admin_password === encryptedPassword) {

      // Store the user object in the session
      req.session.admin = admin;
      res.redirect("/admin");
      }
    else {
      res.status(401).render('login', { title: 'Login', errorMessage: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
})


/* GET logout page. */
router.get('/logout', function(req, res, next) {
  req.session.destroy(err => {
    if (err) {
      console.error(err)
    } else {
      res.redirect('/login')
    }
  })
});




module.exports = router;
