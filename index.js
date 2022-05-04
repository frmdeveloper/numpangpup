process.env.TZ = 'Asia/Jakarta"
const puppeteer = require('puppeteer')
const httpProxy = require("http-proxy")
const host = "0.0.0.0";
const port = process.env.PORT || 8080 || 5000 || 3000
async function createServer(WSEndPoint, host, port) {
  await httpProxy
    .createServer({
      target: WSEndPoint,
      ws: true,
      localAddress: host
    })
    .listen(port)
  return `ws://${host}:${port}`
}

async function start() {
  const browser = await puppeteer.launch({
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
  const customWSEndpoint = await createServer(browserWSEndpoint, host, port)
  console.log({ browserWSEndpoint, customWSEndpoint, pagesCount })
}
start()
