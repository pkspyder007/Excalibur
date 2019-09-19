const ProductRouter = require('express').Router();
const Product = require('../models/product.model');
const request = require('request');
const cheerio = require('cheerio');


ProductRouter.get('/user/:id', (req, res) => {
  Product.find({ userid: req.params.id })
    .then(products => {
      res.json(products);
    })
    .catch(err => {
      console.log(err)
    })
});

ProductRouter.post('/add/amazon', (req, res) => {
  request.get(req.body.product.link, (err, ressponse, html) => {
    if (!err && ressponse.statusCode == 200) {
      let $ = cheerio.load(html);
      let i = $("span.a-size-medium").html();
      let b = i.split(';')
      let c = b[b.length - 1].split(',')
      let cp = parseInt(c[0] + c[1])
      const product = {
        link: req.body.product.link,
        userid: req.body.product.userid,
        currentPrice: cp,
        dropPrice: req.body.product.dropPrice
      };
      Product.create(product)
        .then(p => {
          console.log('product added');
          res.json({ success: true })
        })
        .catch(err => {
          console.log(err)
          res.json({ success: false })
        })
    } else {
      console.log(err)
    }
  });
})

module.exports = ProductRouter;