const FootDistrictApi = require('./footdistrict.js').FootDistrict;

const testFootD = new FootDistrictApi()
testFootD.grabCookies().then((text) => {
    // console.log(text)
    testFootD.createAccount().then((body) => {
        console.log(body)
    })
});