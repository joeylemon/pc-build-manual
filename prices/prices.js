const express = require("express")
const fs = require("fs")
const utils = require("../utils.js")
const builds = require("./builds.js")
const getParts = require("./fetch-scraper.js")

// The file to save prices
const FILE_NAME = "./prices/prices.json"

// The delay between allowing another price refresh
const REFRESH_DELAY = 10 * 60000

const router = express.Router()

/**
 * Get the saved prices in the local json file
 */
function getSavedPrices() {
    if (!fs.existsSync(FILE_NAME))
        return builds

    return JSON.parse(fs.readFileSync(FILE_NAME))
}

/**
 * Save the prices for a given build
 * @param {String} range The build price range (e.g. 500, 1000, etc)
 * @param {Object} build The build object from builds.js
 */
function savePrices(range, build) {
    if (!fs.existsSync(FILE_NAME)) {
        fs.writeFileSync(FILE_NAME, "{}")
    }

    const prices = JSON.parse(fs.readFileSync(FILE_NAME))
    build.lastUpdated = Date.now()
    prices[range] = build
    fs.writeFileSync(FILE_NAME, JSON.stringify(prices))
}

router.get('/saved', async (req, res) => {
    res.status(200).json(getSavedPrices())
})

router.get('/refresh/:range', async (req, res) => {
    const range = req.params.range
    if (!builds[range])
        return res.status(400).send("bad id")

    // If the prices were refreshed recently, don't try to refresh again
    const savedPrices = getSavedPrices()
    if (savedPrices[range] && Date.now() - savedPrices[range].lastUpdated < REFRESH_DELAY) {
        const mins = Math.floor((Date.now() - savedPrices[range].lastUpdated) / 60000)
        console.log("prices refreshed only", mins, "minutes ago, reuse saved prices")

        savedPrices[range].lastUpdated = Date.now()
        
        await utils.sleep(2000)
        return res.status(200).json(savedPrices[range])
    }

    try {
        const build = builds[range]
        const parts = await getParts(build.buildUrl)

        for (const part of parts) {
            // If the price couldn't be found, just use hard-coded price
            if (part.price === -1) continue
            build.prices[part.part] = part.price
        }

        savePrices(range, build)
        return res.status(200).json(build)
    } catch (err) {
        console.log("could not get parts:", err)
        return res.status(500).send("could not get parts")
    }
})

module.exports = router