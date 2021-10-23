# numpangpup
cara konek
___
Javascript
```
const puppeteer = require('puppeteer')
(async() => {
	urlws = "ws://blabla" //dapatkan dari log
	var browser = await puppeteer.connect({ browserWSEndpoint: urlws })
	var page = await browser.newPage()
	await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36")
	await page.goto('https://google.com')
	await page.screenshot({ path: `./screenshot.png` })
	await page.close()
	browser.dicsonnect()
})()
```
___
Python (saya gk paham python)
```
async ():
	from pyppeteer import connect
	urlws = "ws://blabla" //dapatkan dari log
	browser = await connect(browserWSEndpoint=urlws)
    pages = await browser.pages()
    page = pages[0]
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36")
    await page.goto("https://google.com")
	await page.screenshot({path: 'screenshot.png'}) 
```
