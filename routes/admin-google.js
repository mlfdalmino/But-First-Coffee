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
router.get('/admin-google', isAdmin, async (req, res, next) => {
  try {

    const Espresso = await prisma.order.aggregate({
      where: {
        coffee: 'Espresso'
      },
      _sum: {
        price: true,
        quantity: true
      }
    });
    
    const  EspressoPrice = Espresso._sum.price ? Espresso._sum.price.toString().replace(/,/g, '') : '0';
    const  EspressoQuantity = Espresso._sum.quantity ? Espresso._sum.quantity.toLocaleString() : '0';

    
    const Cappuccino  = await prisma.order.aggregate({
      where: {
        coffee: 'Cappuccino'
      },
      _sum: {
        price: true,
        quantity: true
      }
    });
    
    const  CappuccinoPrice = Cappuccino._sum.price ? Cappuccino._sum.price.toString().replace(/,/g, '') : '0';
    const  CappuccinoQuantity = Cappuccino._sum.quantity ? Cappuccino._sum.quantity.toLocaleString() : '0';

    const Americano  = await prisma.order.aggregate({
      where: {
        coffee: 'Americano'
      },
      _sum: {
        price: true,
        quantity: true
      }
    });
    
    const  AmericanoPrice = Americano._sum.price ? Americano._sum.price.toString().replace(/,/g, '') : '0';
    const  AmericanoQuantity = Americano._sum.quantity ? Americano._sum.quantity.toLocaleString() : '0';
    
    const Mocha = await prisma.order.aggregate({
      where: {
        coffee: 'Mocha'
      },
      _sum: {
        price: true,
        quantity: true
      }
    });
    
    const  MochaPrice = Mocha._sum.price ? Mocha._sum.price.toString().replace(/,/g, '') : '0';
    const  MochaQuantity = Mocha._sum.quantity ? Mocha._sum.quantity.toLocaleString() : '0';


    const Frappe = await prisma.order.aggregate({
      where: {
        coffee: 'Frappe'
      },
      _sum: {
        price: true,
        quantity: true
      }
    });
    
    const  FrappePrice = Frappe._sum.price ? Frappe._sum.price.toString().replace(/,/g, '') : '0';
    const  FrappeQuantity = Frappe._sum.quantity ? Frappe._sum.quantity.toLocaleString() : '0';

    
    const Latte = await prisma.order.aggregate({
      where: {
        coffee: 'Latte'
      },
      _sum: {
        price: true,
        quantity: true
      }
    });
     
    const LattePrice = Latte._sum.price ? Latte._sum.price.toString().replace(/,/g, '') : '0';
    const  LatteQuantity = Latte._sum.quantity ? Latte._sum.quantity.toLocaleString() : '0';

    
   
    

    res.render('admin-google', { title: 'Express', MochaPrice, MochaQuantity, EspressoPrice, EspressoQuantity, CappuccinoPrice, CappuccinoQuantity, AmericanoPrice, AmericanoQuantity, FrappePrice, FrappeQuantity, LattePrice, LatteQuantity});
  } catch (error) {
    console.error('Error fetching user records:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
