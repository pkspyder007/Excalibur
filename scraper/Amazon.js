const request = require('request');
const cheerio = require('cheerio');

scraper = (url) => {
  request.get(url, (err, ressponse, html) => {
    url
    if (!err && ressponse.statusCode == 200) {
      let $ = cheerio.load(html);

      var i = $("span.a-size-medium").html();
      var b = i.split(';')
      let price = parseInt(b[b.length - 1])

      return price

    } else {
      console.log(err)
    }
  });
}

module.exports = scraper;