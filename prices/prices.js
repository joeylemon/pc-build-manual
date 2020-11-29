const express = require("express")
const fs = require("fs")
const builds = require("./builds.js")
const getParts = require("./scraper.js")

const router = express.Router()

/**
 * Get the saved prices in the local json file
 */
function getSavedPrices() {
    if (!fs.existsSync("prices.json"))
        return builds

    return JSON.parse(fs.readFileSync("prices.json"))
}

/**
 * Save the prices for a given build
 * @param {String} range The build price range (e.g. 500, 1000, etc)
 * @param {Object} build The build object from builds.js
 */
function savePrices(range, build) {
    if (!fs.existsSync("prices.json")) {
        fs.writeFileSync("prices.json", "{}")
    }

    const prices = JSON.parse(fs.readFileSync("prices.json"))
    build.lastUpdated = Date.now()
    prices[range] = build
    fs.writeFileSync("prices.json", JSON.stringify(prices))
}

router.get('/saved', async (req, res) => {
    res.status(200).json(getSavedPrices())
})

router.get('/refresh/:range', async (req, res) => {
    const range = req.params.range
    if (!builds[range])
        return res.status(400).send("bad id")

    try {
        const build = builds[range]
        const parts = await getParts(build.buildUrl)

        for (const part of parts) {
            if (part.price === -1) continue
            build.prices[part.part] = part.price
        }

        savePrices(range, build)
        res.status(200).json(build)
    } catch (err) {
        console.log("could not get parts:", err)
        return res.status(500).send("could not get parts")
    }
})

module.exports = router