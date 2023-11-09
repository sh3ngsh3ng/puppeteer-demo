// REFERENCE: https://www.youtube.com/watch?v=lgyszZhAZOI

const puppeteer = require('puppeteer')
const fs = require('fs/promises')
const cron = require('node-cron')

async function main() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false
    })
    // create new tab
    const page = await browser.newPage()
    // navigate to url
    await page.goto("https://learnwebcode.github.io/practice-requests/")
    
    // // take screenshot
    // await page.screenshot({
    //     path: "amazing.png",
    //     fullPage: true  
    // })


    // // writing to text files (without PPT)
    // const names = ['red', 'orange', 'yellow']
    // await fs.writeFile("names.txt", names.join("\r\n")) // \r = return \n = new line


    // // write to files (with PPT)
    // // evaluate method is more generic
    // const names = await page.evaluate(()=> {
    //     return Array.from(document.querySelectorAll(".info strong")).map(x => x.textContent)
    // })
    // await fs.writeFile("names.txt", names.join("\r\n"))


    // $$eval to select MULTIPLE element
    const photos = await page.$$eval("img", (img) => {
        return img.map(x => x.src)
    })

    console.log(photos)
    // // saving photos
    // for (const photo of photos) {
    //     const imagePage = await page.goto(photo)
    //     await fs.writeFile(photo.split("/").pop(), await imagePage.buffer())
    // }


    // // clicking button
    // await page.click("#clickme")

    // // $eval to select ONE element
    // const clickedData = await page.$eval("#data", (el) => el.textContent)
    // console.log(clickedData)


    // // type input and click, wait for page change
    await page.type("#ourfield", "blue")

    await Promise.all([page.click("#ourform button"), page.waitForNavigation()])
    // await page.click("#ourform button")
    // await page.waitForNavigation()

    // const info = await page.$eval("#message", (el) => el.textContent)
    // console.log(info)


    // close browser
    await browser.close()
}

// scheduling
// setInterval(main, 5000)

// cron can schedule days hours etc
cron.schedule("*/5 * * * * *", main)



// main()