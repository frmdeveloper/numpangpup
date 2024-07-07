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
    ]
})
const pagesCount = (await browser.pages()).length
const wsen = await browser.wsEndpoint()
const target = wsen.split("ws://")[1].split("/")[0]
console.log({ target, wsen, pagesCount })

import proxy from "http-proxy"
await proxy.createServer({
    target, ws: true
})
.listen(port)
