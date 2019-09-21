const ProductRouter = require('express').Router();
const request = require('request');
const cheerio = require('cheerio')
const Product = require('../models/product.model');
const User = require('../models/google.user.model');


ProductRouter.post('/add/amazon', (req, res) => {
  let price;
  request.get(req.body.product.link, (err, response, html) => {
    if (!err && response.statusCode == 200) {
      let $ = cheerio.load(html);
      let i = $("span.a-size-medium").html();
      let b = i.split(';')
      let c = b[b.length - 1].split(',');
      if (c.length === 3) {
        price = parseInt(c[0] + c[1] + c[2]);
      } else {
        price = parseInt(c[0] + c[1])
      }
      const newProduct = {
        link: req.body.product.link,
        site: 'amazon',
        currentPrice: price
      };
      Product.find({ link: req.body.product.link }).then(p => {
        if (p.length < 1) {
          Product.create(newProduct).then(product => {
            User.findById(req.body.product.userid).then(user => {
              User.findByIdAndUpdate(req.body.product.userid, {
                products: [...user.products, {
                  id: product._id,
                  dropPrice: req.body.dropPrice,
                  link: req.body.product.link,
                  notified: false
                }]
              }).then(update => {
                res.json({ success: true })
              }).catch(err => {
                res.json({ success: false })
                console.log(err)
              })
            })
          }).catch(err => {
            console.log(err)
          })
        } else {
          User.findById(req.body.product.userid).then(user => {
            User.findByIdAndUpdate(req.body.product.userid, {
              products: [...user.products, {
                id: p[0]._id,
                dropPrice: req.body.product.dropPrice,
                link: req.body.product.link,
                notified: false
              }]
            }).then(update => {
              res.json({ success: true })
            }).catch(err => {
              res.json({ success: false })
              console.log(err)
            })
          }).catch(err => {
            console.log(err)
          })
        }
      })

    } else {
      console.log('error in retieving price')
    }
  });
});


ProductRouter.post('/add/flipkart', (req, res) => {
  request.get(req.body.product.link, (err, ressponse, html) => {
    if (!err && ressponse.statusCode == 200) {
      let $ = cheerio.load(html);
      let i = $("div._1uv9Cb").text();
      let b = i.split('₹');
      let c = b[1];
      let d = c.split(',');
      let price;
      if (d.length === 3) {
        price = parseInt(d[0] + d[1] + d[2])
      } else {
        price = parseInt(d[0] + d[1])
      }
      const newProduct = {
        link: req.body.product.link,
        site: 'flipkart',
        currentPrice: price
      };
      Product.find({ link: req.body.product.link }).then(p => {
        if (p.length < 1) {
          Product.create(newProduct).then(product => {
            User.findById(req.body.product.userid).then(user => {
              User.findByIdAndUpdate(req.body.product.userid, {
                products: [...user.products, {
                  id: product._id,
                  dropPrice: req.body.dropPrice,
                  link: req.body.product.link,
                  notified: false
                }]
              }).then(update => {
                res.json({ success: true })
              }).catch(err => {
                res.json({ success: false })
                console.log(err)
              })
            })
          }).catch(err => {
            console.log(err)
          })
        } else {
          User.findById(req.body.product.userid).then(user => {
            User.findByIdAndUpdate(req.body.product.userid, {
              products: [...user.products, {
                id: p[0]._id,
                dropPrice: req.body.product.dropPrice,
                link: req.body.product.link,
                notified: false
              }]
            }).then(update => {
              res.json({ success: true })
            }).catch(err => {
              res.json({ success: false })
              console.log(err)
            })
          }).catch(err => {
            console.log(err)
          })
        }
      })
    } else {
      console.log(err)
    }
  });
});


ProductRouter.post('/user/', (req, res) => {
  User.findById(req.body.id).then(user => {
    res.json(user.products)
  }).catch(err => {
    console.log(err);
  })
});


module.exports = ProductRouter;