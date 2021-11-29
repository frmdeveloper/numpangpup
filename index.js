var express = require('express'),
  cors = require('cors'),
  secure = require('ssl-express-www');
const PORT = process.env.PORT || 8080 || 5000 || 3000
const app = express()
const bodyParser = require('body-parser')
const { spawn, exec, execSync } = require("child_process")
app.enable('trust proxy')
app.set("json spaces",2)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(secure)
app.use(express.static("public"))
app.listen(PORT, () => {
  console.log(`Server berjalan dengan port: ${PORT}`)
})
const ngrok = require('ngrok');
(async function() {
  await ngrok.authtoken("1zsvdYClpKdGLVkc9jVLJgUfJj9_6bomDQGhHqQ2dYqXmgkUb")  
})();
const puppeteer = require('puppeteer');
(async () => {
  browserrr = await puppeteer.launch({
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
  browserWSEndpoint = await browserrr.wsEndpoint()
  ngrokurl = await ngrok.connect({proto: 'http', addr: browserWSEndpoint.split("127.0.0.1:")[1].split('/')[0]})
  console.clear()
  console.log('\n\n'+ngrokurl.replace('https://', 'ws://')+'/devtools/'+browserWSEndpoint.split('devtools/')[1])
})();
app.get('*', async(req, res) => {
	res.json('p')
})
app.get('/wse', async(req, res) => {
	res.json('\n\n'+ngrokurl.replace('https://', 'ws://')+'/devtools/'+browserWSEndpoint.split('devtools/')[1])
})