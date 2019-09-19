const request = require('request');
const cheerio = require('cheerio');

scraper = () => {
  request.get('https://www.amazon.in/dp/B07T8HLV1W?pf_rd_p=07234aa0-7578-46b5-b03c-8412cb6f3626&pf_rd_r=R59FSKQV5YJS8D4GPZWW', (err, ressponse, html) => {
    if (!err && ressponse.statusCode == 200) {
      let $ = cheerio.load(html);

      var i = $("span.a-size-medium").html();
      var b = i.split(';')
      let price = b[b.length - 1]
    } else {
      console.log(err)
    }
  });
}

module.exports = scraper;