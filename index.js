process.env.TZ = "Asia/Jakarta"
const http = require('http')
const httpProxy = require("http-proxy")
const express = require('express')
const port = process.env.PORT || 8080 || 5000 || 3000

function createServer(target) {
  var app = express()
  var proxy = httpProxy.createProxyServer({ target, ws: true })
  var server = http.createServer(app)
  
  app.get('/', function(req, res) {
    res.send('Silahkan konek')
  })
  server.on('upgrade', function (req, socket, head) {
    console.log(req)
    proxy.ws(req, socket, head)
  })
  server.listen(port)
  return `ws://0.0.0.0:${port}` 
}

// start browser
async function start() {
  const browser = await require('puppeteer').launch({
    //executablePath: '',
    defaultViewport: { width: 1280, height: 720 },
    headless: true,
    args: [
      '--log-level=3',
      '--disable-dev-shm-usage',
      '--no-default-browser-check',
      '--disable-site-isolation-trials',
      '--no-experiments',
      '--ignore-gpu-blacklist',
      '--ignore-certificate-errors',
      '--ignore-certificate-errors-spki-list',
      '--disable-gpu',
      '--disable-extensions',
      '--disable-default-apps',
      '--enable-features=NetworkService',
      '--disable-setuid-sandbox',
      '--no-sandbox',
      // Extras
      '--disable-webgl',
      '--disable-threaded-animation',
      '--disable-threaded-scrolling',
      '--disable-in-process-stack-traces',
      '--disable-histogram-customizer',
      '--disable-gl-extensions',
      '--disable-composited-antialiasing',
      '--disable-canvas-aa',
      '--disable-3d-apis',
      '--disable-accelerated-2d-canvas',
      '--disable-accelerated-jpeg-decoding',
      '--disable-accelerated-mjpeg-decode',
      '--disable-app-list-dismiss-on-blur',
      '--disable-accelerated-video-decode',
      '--no-zygote',
      '--single-process' // <- this one doesn't works in Windows
    ]
  })
  const pagesCount = (await browser.pages()).length
  const browserWSEndpoint = await browser.wsEndpoint()
  const customWSEndpoint = await createServer(browserWSEndpoint)
  console.log({ browserWSEndpoint, customWSEndpoint, pagesCount })
}
start()
