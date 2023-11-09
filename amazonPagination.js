const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        headless: true, // to show browser. default is true, no browser shown
        defaultViewport: false,
        // userDataDir: ""
    })

    // new tab
    const page = await browser.newPage() 

    await page.goto("https://www.amazon.sg")


    await page.type("input[name=field-keywords]", "minecraft")
    await page.click("input[type=submit]")
    await page.waitForNavigation()


    let itemArray = []

    let flag = true
    while (flag) {
        const items = await page.$$(".s-card-container")
        for (item of items) {
        
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
        
        // await page.waitForSelector(".s-pagination-next.s-pagination-disabled")
       
        console.log("while loop =>", flag)
      
        await page.waitForSelector(".s-pagination-next.s-pagination-button")
        await page.click(".s-pagination-next.s-pagination-button")
        
        // await page.waitForSelector(".s-pagination-item.s-pagination-next.s-pagination-disabled")
        let next_page_exist = await page.$(".s-pagination-item.s-pagination-next.s-pagination-disabled") == null 
        if (!next_page_exist) {
            flag = !flag
        }
        console.log(flag)

    }

    console.log("success")
    
    console.log(itemArray)
    // console.log(itemArray.length)


    // const titles = await page.evaluate(() => {
    //     return Array.from(document.querySelectorAll("h2 > a > span")).map((x => x.innerHTML))
    // })
    // console.log(titles)


    // close browser
    // await browser.close()

})();

