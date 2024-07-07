const port = process.env.PORT || 3000 || 8080
import which from "which"
import puppeteer from "puppeteer"

const browser = await puppeteer.launch({
    executablePath: await which("chromium"),
    userDataDir: "./",
    defaultViewport: { width: 1280, height: 720 },
    headless: true,
    args: [
      "--disable-gpu",
      "--no-sandbox",
      "--remote-debugging-port="+port
    ]
})
const pagesCount = (await browser.pages()).length
const browserWSEndpoint = await browser.wsEndpoint()
console.log({ browserWSEndpoint, pagesCount })
