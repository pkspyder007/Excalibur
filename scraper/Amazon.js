const request = require('request');
const cheerio = require('cheerio');
const Product = require('../models/product.model');

Amazon = () => {

  Product.find({}, (err, products) => {
    if (err) console.log(err)
    else {
      products.map(p => {
        if (p.site === 'amazon') {
          request.get(p.link, (err, response, html) => {
            if (err) {
              console.log(err)
            } else {
              let $ = cheerio.load(html)
              let i = $("span.a-size-medium").html();
              let b = i.split(';');
              let c = b[b.length - 1].split(',')
              var cp;
              if (c.length === 3) {
                cp = parseInt(c[0] + c[1] + c[2]);
              } else {
                cp = parseInt(c[0] + c[1])
              }
              if (p.currentPrice > cp) {
                Product.findByIdAndUpdate(p._id, { currentPrice: cp })
                  .then(product => {
                    console.log('price dropped')
                  }).catch(err => {
                    console.log(err)
                  })
              }
            }

          });
        }
      })
    }
  });
}