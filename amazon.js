const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        headless: false, // to show browser. default is true, no browser shown
        defaultViewport: false,
        // userDataDir: ""
    })

    // new tab
    const page = await browser.newPage() 

    await page.goto("https://www.amazon.sg")


    await page.type("input[name=field-keywords]", "")
    await page.click("input[type=submit]")
    await page.waitForNavigation()

    const items = await page.$$(".s-card-container")

    let itemArray = []

    for (item of items) {
        // try {
        //      titles = await page.$$eval("h2 > a > span", (el) => {       
        //         return el.map((el) => el.textContent)
        //     }) 
        // } catch {}
        
        try {
            price = await page.evaluate((el) => {
                return el.querySelector(".a-price-whole").textContent
            }, item)
        } catch {}

        try {
            title = await page.evaluate((el) => {
                return el.querySelector("h2>a>span").textContent
            }, item)
        } catch{}

        itemArray.push({
            title,price
        })
        

    }
    console.log(itemArray)


    // const titles = await page.evaluate(() => {
    //     return Array.from(document.querySelectorAll("h2 > a > span")).map((x => x.innerHTML))
    // })
    // console.log(titles)


    // close browser
    // await browser.close()

})();

