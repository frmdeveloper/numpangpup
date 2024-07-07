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
const target = "http://"+wsen.split("ws://")[1].split("/")[0]+"/json/version"
console.log({ target, wsen, pagesCount })

import proxy from "http-proxy"
proxy.createServer({
    target, ws:true, localAddress:0.0.0.0
}).listen(port)
