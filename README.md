**Deploy dulu**

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https://github.com/frmdeveloper/numpangpup)

___
**Fungsi:** Numpang/kontrol puppeteer dari perangkat lain<br>
___
cara menggunakan di JS
```js
const puppeteer = require('puppeteer-core')
(async() => {
  let browser = await puppeteer.connect({ browserWSEndpoint: "ws://bla.blabla.bla" })
  let page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })
  await page.goto('https://google.com')
  await page.screenshot({ path: `./screenshot.png` })
  await page.close()
  browser.dicsonnect()
})()
```
___
#### Cara lain lihat google
