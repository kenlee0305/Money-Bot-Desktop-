const cheerio = require('cheerio');
const rp = require('request-promise');
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
var tough = require('tough-cookie');
var Cookie = tough.Cookie;
var store = tough.Store;

class FootDistrict {
    constructor() {
        this.cookieJar = rp.jar()
        this.headers = {
            'cache-control': 'max-age=0',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
        }
    }

    grabCookies() {
        var self = this
        return new Promise((resolve) => {
            var JAR = new tough.CookieJar()
            nightmare
                    .goto('https://footdistrict.com/en/customer/account/create/')
                    .cookies.get()
                    .end()
                    .then(cookies => {
                        // do something with the cookies
                        var parsedCookies = [];
                        let extensions = [
                            'session=true'
                        ]
                        cookies.forEach(function(cookie) {
                            console.log(cookie.value)
                            parsedCookies.push(new tough.Cookie({
                                domain: 'footdistrict.com',
                                key: cookie.name,
                                value: cookie.value,
                                secure: cookie.secure || false,
                                path: cookie.path,
                                httpOnly: cookie.httpOnly || false,
                                extensions: extensions
                            }))
                        })
                        console.log(parsedCookies);
                        parsedCookies.forEach(function(cookie) {
                            //cookie.domain = "footdistrict.com"
                            // cookie.expirationDate = "";
                            // cookie.path = "";
                            // var parsedCookie = JSON.stringify(cookies[x]);
                            
                            self.cookieJar.setCookie(cookie, "https://footdistrict.com", { http: true}, function(err, cookie) {
                                if (err) {
                                    console.log(err)
                                }
                            })
                        })
                        resolve(self.cookieJar)
                    })
                    // .then(resolve(self.cookieJar))
                   // console.log(JAR)
                    .catch(error => {
                        console.error('Search failed:', error)
                    })
                    //console.log(JAR)
                    
            }) 
    }

    createAccount(cookies) {
        return new Promise((resolve) => {
            console.log(this.cookieJar);
            let options = {
                uri: 'https://footdistrict.com/en/customer/account/create/',
                headers: this.headers,
                followAllRedirects: true,
                resolveWithFullResponse: true,
                jar: this.cookieJar,
                gzip: true
            }
            rp(options)
                .then((body) => {
                    resolve(body)
                }).catch((err) => {
                    console.log(err);
                })
            })
    }

}

module.exports = {
    FootDistrict: FootDistrict
}
