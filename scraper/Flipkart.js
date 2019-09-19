const request = require('request');
const cheerio = require('cheerio');

scraper = (url) => {
  request.get(url, (err, ressponse, html) => {
    if (!err && ressponse.statusCode == 200) {
      let $ = cheerio.load(html);

      let i = $("div._1uv9Cb").text();
      let b = i.split('₹');
      let price = b[1];
      return parseInt(price)
    } else {
      console.log(err)
    }
  });
}
module.exports = scraper;