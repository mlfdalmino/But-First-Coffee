var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const {PrismaClient, Prisma, admin} = require("@prisma/client")
var prisma = new PrismaClient()

/* GET home page. */
router.get('/register', async function(req, res, next) {
  var admins = await prisma.admin.findMany()

  res.render('register', { title: 'Express', admins: admins});
});

/* POST register page. */
router.post('/register', async function(req, res, next) {
  const { admin_email, admin_password,} = req.body;

  // Encrypt password using SHA256
  const hash = crypto.createHash('sha256');
  hash.update(admin_password);
  const encryptedPassword = hash.digest('hex');

  let usertype = "Admin";

  try {
    const admin = await prisma.admin.create({
      data: {
        admin_email,
        admin_password: encryptedPassword, // Store encrypted password
        usertype
      },
    });
    res.redirect('/login');
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(400).render('register', { title: 'Express', error: 'Email already exists.' });
    } else {
      console.error(error);
      res.status(500).render('register', { title: 'Express', error: 'Something went wrong. Please try again later.' });
    }
  }
});
module.exports = router;
