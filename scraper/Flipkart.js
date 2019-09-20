const request = require('request');
const cheerio = require('cheerio');
const Product = require('../models/product.model');
Flipkart = () => {
  Product.find({}, (err, products) => {
    if (err) console.log(err)
    else {
      products.map(p => {
        if (p.site === 'flipkart') {
          request.get(p.link, (err, response, html) => {
            if (err) {
              console.log(err)
            } else {
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
              if (p.currentPrice > price) {
                Product.findByIdAndUpdate(p._id, { currentPrice: price })
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