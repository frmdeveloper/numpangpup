**Deploy dulu baru di tes**<br>
Deploy ke heroku harus lewat tombol ungu<br>
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https://github.com/frmdeveloper/numpangpup)

___
**Fungsi:** Numpang/kontol puppeteer dari perangkat lain<br>
___
**Contoh** cara menggunakan di JS
```js
const puppeteer = require("puppeteer-core")

async function screenshot(url) {
  const browser = await puppeteer.connect({browserURL: "http://your.url"})
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })
  await page.goto(url)
  const result = await page.screenshot()
  await page.close()
  //browser.dicsonnect()
  return result
}
```
___
#### Cara lain lihat google
