const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')

puppeteer.use(StealthPlugin())
puppeteer.use(
    RecaptchaPlugin({
        provider: {
            id: '2captcha',
            token: '24ec83bab6766b599fa407204bde5827',
        },
        visualFeedback: true,
    })
)

async function getParts(url) {
    console.log("launch browser")
    const browser = await puppeteer.launch({
        headless: true,
        userDataDir: "./browser_data",
        args: [
            '--proxy-server=http://209.165.163.187:3128',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    })

    console.log("create page")
    const page = await browser.newPage()

    console.log("go to", url)
    await page.goto(url, { waitUntil: "networkidle0" })

    console.log("solve any captchas")
    await page.solveRecaptchas()

    // console.log(await page.content())

    console.log("scrape parts")
    const parts = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".selectorWrapper")).map(e => {
            const partDiv = e.querySelector(".selectorName")
            const nameDiv = e.querySelector(".description")
            const priceDiv = e.querySelector(".price")
            const priceText = priceDiv ? priceDiv.innerText.replace("$", "").trim() : "-1"
            return {
                part: partDiv ? partDiv.innerText.replace("Video Card", "GPU").replace("Power Supply", "PSU").replace("RAM", "Memory").replace("Heatsink", "Cooler").replace("2.5\" SSD", "Storage").replace("M.2 SSD", "Storage") : "",
                name: nameDiv ? nameDiv.innerText : "",
                price: parseFloat(priceText)
            }
        }).filter(p => p.price > 0)
    })

    await page.close()
    await browser.close()

    if (parts.length === 0)
        throw new Error("captcha blocked")

    return parts
}

module.exports = getParts