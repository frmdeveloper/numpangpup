const port = process.env.PORT || 4567
import which from "which"
import puppeteer from "puppeteer"

const browser = await puppeteer.launch({
    executablePath: await which("chromium"),
    userDataDir: "./data",
    defaultViewport: { width: 1280, height: 720 },
    headless: true,
    args: [
      "--disable-gpu",
      "--no-sandbox",
      "--whitelisted-ips", 
      "--allowed-origins='*'"
    ]
})
const pagesCount = (await browser.pages()).length
const wsen = await browser.wsEndpoint()
const target = "http://"+wsen.split("ws://")[1].split("/")[0]
console.log({ target, wsen, pagesCount })

import proxy from "http-proxy"
proxy.createServer({
    target, ws:true
}).listen(port)
