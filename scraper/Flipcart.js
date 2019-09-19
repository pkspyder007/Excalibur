const request = require('request');
const cheerio = require('cheerio');

scraper = () => {
  request.get('https://www.flipkart.com/tripr-abstract-men-hooded-neck-dark-blue-t-shirt/p/itmfbh24farrt3qj?pid=TSHFBDGVXMVHVUPY&lid=LSTTSHFBDGVXMVHVUPYCGUS7L&marketplace=FLIPKART&srno=b_1_4&otracker=nmenu_sub_Men_0_T-Shirts&fm=organic&iid=bcd5c6f5-9d1b-449d-9f20-9660cdf83d39.TSHFBDGVXMVHVUPY.SEARCH&ppt=browse&ppn=browse&ssid=rl28y979q80000001568907074403', (err, ressponse, html) => {
    if (!err && ressponse.statusCode == 200) {
      let $ = cheerio.load(html);

      let i = $("div._1uv9Cb").text();
      let b = i.split('₹');
      let price = b[1];
      console.log(price)
    } else {
      console.log(err)
    }
  });
}
module.exports = scraper;