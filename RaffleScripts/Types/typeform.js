const cheerio = require('cheerio');
const rp = require('request-promise');

class TypeForm {
    constructor(userInfo, site) {      
        this.userInfo = userInfo
        this.site = site
        this.headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'https://footdistrict.typeform.com',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
        }
    }

    createAccount() {
        /*
            Method creates account on site, if required
        */
    }

    enterRaffle(url) {
        /*
            Enters raffle on site
        */


    }

    navToRaffleLink(url) {
        /*
            Navigates to raffle page.
        */

        let options = {
            uri: url,
            headers: this.headers
        }
    }


}