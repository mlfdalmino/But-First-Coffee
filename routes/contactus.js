var express = require('express');
var router = express.Router();
const {PrismaClient, Prisma } = require("@prisma/client")
var prisma = new PrismaClient()

/* GET home page. */
router.get('/contactus', async function(req, res, next) {
  
    res.render('contactus', { title: 'ContactUs' });
  });

/* POST register page. */
router.post('/contactus', async function(req, res, next) {
  const { name, email, branch, message  } = req.body;
  try {
    
    const nextnum_concerns = await prisma.concerns.aggregate({
      _max: { num_concerns: true }
    });

    const contactus = await prisma.concerns.create({
      data: {
        num_concerns: nextnum_concerns._max.num_concerns + 1,
        name,
        email,
        branch,
        message
      },
    });
    res.redirect('/contactus');
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});
module.exports = router;
