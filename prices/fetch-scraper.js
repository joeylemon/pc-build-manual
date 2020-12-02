/**
 * Perform a simple GET request to parse a website's HTML contents for scraping
 */

const axios = require("axios")
const { JSDOM } = require("jsdom")

async function getParts(url) {
    const { data } = await axios.get(url)
    const { document } = new JSDOM(data).window

    const parts = Array.from(document.querySelectorAll(".selectorWrapper")).map(e => {
        const partDiv = e.querySelector(".selectorName")
        const priceDiv = e.querySelector(".price")
        const priceText = priceDiv ? priceDiv.textContent.replace("$", "").trim() : "-1"
        return {
            part: partDiv ? partDiv.textContent.trim().replace("Video Card", "GPU").replace("Power Supply", "PSU").replace("RAM", "Memory").replace("Heatsink", "Cooler").replace("2.5\" SSD", "Storage").replace("M.2 SSD", "Storage") : "",
            price: parseFloat(priceText)
        }
    }).filter(p => p.price > 0)

    return parts
}

module.exports = getParts