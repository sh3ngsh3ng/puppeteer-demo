const puppeteer = require("puppeteer")
const fs = require('fs/promises')
require('dotenv').config()


// function imagesHaveLoaded() {
//     return Array.from(document.images).every((i) => i.complete)
// }

async function loginInstagram() {
    // open up browser (headless = false opens up the browser for view)
    const browser = await puppeteer.launch({
        headless: false
    })
    // incognito mode
    const context = await browser.createIncognitoBrowserContext()
    // new tab
    const page = await context.newPage()
    // go to link
    await page.goto("https://www.instagram.com/", {
        waitUntil: 'networkidle2'
    })
    // fill in login details
    await page.type("input[name=username]", process.env.INSTA_USERNAME)
    await page.type("input[name=password]", process.env.INSTA_PASSWORD)
    // submit login form
    await page.click("button[type=submit]")
    await page.waitForNavigation()
    // refresh instagram page
    await page.click("a[href='/']")
    await page.waitForNavigation()
    // click on popup
    const [button] = await page.$x("//button[.='Not Now']")
    if (button) {
        await button.click()
    }
    // screenshot page
    await page.screenshot({
        path: "inputtest.png"
    })


    // await browser.close()
}

loginInstagram()