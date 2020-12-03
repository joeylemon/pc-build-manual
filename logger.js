const utils = require("./utils.js")

module.exports = {
    print: msg => {
        console.log(`[${utils.getTimeCST().toLocaleString()}] ${msg}`)
    }
}