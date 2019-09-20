const nodemailer = require('nodemailer');
const Product = require('../models/product.model')
const User = require('../models/google.user.model')

const transporter = nodemailer.createTransport({
  service: process.env.NM_SERVICE,
  auth: {
    user: process.env.NM_FROM,
    pass: process.env.NM_PASSWORD
  }
});

Notify = () => {
  Product.find({}, (err, products) => {
    if (err) console.error(err)
    else {
      products.map(p => {
        if (p.dropPrice >= p.currentPrice) {
          User.findById(p.userid, (err, user) => {
            if (err) console.error(err)
            else {
              const mailOptions = {
                from: 'praveenkr.564@gmail.com', // sender address
                to: user.email, // list of receivers
                subject: 'Track It Down Update', // Subject line
                html: `<h1> Price Dropped </h1><a href=${p.link}>Click Here</a><br /> <h2>Track It Down </h2>`
              };
              transporter.sendMail(mailOptions, (err, info) => {
                if (err) console.log(err);
                else console.log('email sent...');
              })
            }
          })
        }
      })
    }
  })
}