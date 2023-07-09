var express = require('express');
var router = express.Router();
const {PrismaClient, Prisma } = require("@prisma/client")
var prisma = new PrismaClient()

/* GET home page. */
router.get('/order', async function(req, res, next) {
  
    res.render('order', { title: 'Order' });
  });

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  function getWeekNumberFromDate(date) {
    const day = date.getDate();
    const weekNumber = Math.ceil(day / 7);
    return Math.min(weekNumber, 4); // Limit to 4 weeks
  }

  /* POST register page. */
router.post('/order', async function(req, res, next) {
  const { name, email, coffee, size, quantity, branch } = req.body;
  let price = 0;
  const date = new Date();

  if (size === 'Small') {
    price = 100 * quantity;
  } else if (size === 'Medium') {
    price = 120 * quantity;
  } else if (size === 'Large') {
    price = 140 * quantity;
  }

  try {
    
    const nextnum_order = await prisma.order.aggregate({
      _max: { num_order: true }
    });

    const quantity = parseInt(req.body.quantity, 10); 

    const order = await prisma.order.create({
      data: {
        num_order: nextnum_order._max.num_order + 1,
        name,
        email,
        coffee,
        size,
        quantity:quantity,
        branch,
        price,
        year: parseInt(date.getFullYear()),
        month_name: months[date.getMonth()],
        month_num: parseInt(date.getMonth()) + 1, 
        week: parseInt(getWeekNumberFromDate(date))
      },
    });
    
    res.redirect('/order');
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});
module.exports = router;
