(async() => {

const puppeteer = require('puppeteer')
const http = require('http')
const forward = require('http-forward')
const app = require('express')()
const cors = require('cors')
const server = http.createServer(app)
app.use(cors())
const port = process.env.PORT || 8080 || 5000 || 3000
const browser = await puppeteer.launch({
	//executablePath: process.cwd()+'',
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
const browserWSEndpoint = await browser.wsEndpoint()
app.get('/', async(req, res) => {
	const pagesCount = (await browser.pages()).length // just to make sure we have the same stuff on both place
	res.json({ browserWSEndpoint, pagesCount })
})
app.use((req, res) => {
  req.forward = { target: url }
  forward(req, res)
})
server.listen(port, async() => {
	const pagesCount = (await browser.pages()).length // just to make sure we have the same stuff on both place
	console.log({ browserWSEndpoint, pagesCount })
})

})