**Deploy dulu baru di tes**<br>
Deploy ke heroku harus lewat tombol ungu<br>
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https://github.com/frmdeveloper/numpangpup)

___
**Fungsi:** Numpang/kontol puppeteer dari perangkat lain<br>
___
**Contoh** cara menggunakan di JS
```js
const puppeteer = require("puppeteer-core")
global.browserWSEndpoint = "ws://bla.blabla.bla?token=free" //token bisa diubah di index.js

async function screenshot(url) {
  let browser = await puppeteer.connect({ browserWSEndpoint })
  let page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })
  await page.goto(url)
  let result = await page.screenshot()
  await page.close()
  //browser.dicsonnect()
  return result
}
```
___
#### Cara lain lihat google
