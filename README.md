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
	await page.goto('https://google.com')
	await page.screenshot({ path: `./screenshot.png` })
	await page.close()
	browser.dicsonnect()
})()
```
