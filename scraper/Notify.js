const nodemailer = require('nodemailer');
const Product = require('../models/product.model')
const User = require('../models/google.user.model')
const emailBody = require('../Email.tempate')

const transporter = nodemailer.createTransport({
  service: process.env.NM_SERVICE,
  auth: {
    user: process.env.NM_FROM,
    pass: process.env.NM_PASSWORD
  }
});

Notify = () => {

  User.find({}).then(users => {
    users.map(user => {
      user.products.map(p => {
        Product.findById(p.id).then(product => {
          if (p.dropPrice >= product.currentPrice) {
            if (p.notified === false) {
              const mailOptions = {
                from: 'praveenkr.564@gmail.com', // sender address
                to: user.email, // list of receivers
                subject: 'Track It Down Update', // Subject line
                html: emailBody(p.link)
              };
              transporter.sendMail(mailOptions, (err, info) => {
                if (err) console.log(err);
                else {
                  console.log('email sent...');
                  let p = []
                  p = user.products.map(pro => {
                    if (pro.id === p.id) {
                      pro.notified = true
                    }
                    return pro;
                  })
                  User.findByIdAndUpdate(user._id, { products: p }).then(uUser => {

                  }).catch(err => {
                    console.log(err);
                  })
                }
              })
            }
          }
        }).catch(err => {
          console.log(err);
        });
      });
    });
  }).catch(err => {
    console.log(err);
  });




  // Product.find({}, (err, products) => {
  //   if (err) console.error(err)
  //   else {
  //     products.map(p => {
  //       if (p.dropPrice >= p.currentPrice) {
  //         User.findById(p.userid, (err, user) => {
  //           if (err) console.error(err)
  //           else {
  //             const mailOptions = {
  //               from: 'praveenkr.564@gmail.com', // sender address
  //               to: user.email, // list of receivers
  //               subject: 'Track It Down Update', // Subject line
  //               html: emailBody(p.link)
  //             };
  //             transporter.sendMail(mailOptions, (err, info) => {
  //               if (err) console.log(err);
  //               else console.log('email sent...');
  //             })
  //           }
  //         })
  //       }
  //     })
  //   }
  // })
}