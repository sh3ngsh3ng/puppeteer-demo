const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        headless: false, // to show browser. default is true, no browser shown
        defaultViewport: false,
        // userDataDir: ""
    })

    // new tab
    const page = await browser.newPage() 

    await page.goto("https://www.google.com")

    // take screenshot
    await page.screenshot({
        path: "example.png"
    })

    // close browser
    // await browser.close()

})();

