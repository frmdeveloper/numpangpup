const puppeteer = require('puppeteer-core')
const httpProxy = require("http-proxy")
const host = "0.0.0.0"
const port = process.env.PORT || 8080 || 5000 || 3000
async function createServer(WSEndPoint, host, port) {
  await httpProxy
    .createServer({
      target: WSEndPoint, // where we are connecting
      ws: true,
      localAddress: host // where to bind the proxy
    })
    .listen(port); // which port the proxy should listen to
  return `ws://${host}:${port}`; // ie: ws://123.123.123.123:8080
}

async function start () {
  const browser = await puppeteer.launch({
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
  const pagesCount = (await browser.pages()).length // just to make sure we have the same stuff on both place
  const browserWSEndpoint = await browser.wsEndpoint()
  const customWSEndpoint = await createServer(browserWSEndpoint, host, port)
  console.log({ browserWSEndpoint, customWSEndpoint, pagesCount })
}
start()