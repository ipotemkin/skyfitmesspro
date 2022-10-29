const path = require('path')
const express = require('express')
const { parse } = require('url')
const bodyParser = require('body-parser');

const morgan = require("morgan")
const { createProxyMiddleware } = require('http-proxy-middleware')

const modifyResponse = require('node-http-proxy-json')

const app = express()
const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '..', 'build')

const API_SERVICE_URL = 'https://identitytoolkit.googleapis.com'
const API_SERVICE_DOMAIN = 'googleapis.com'

const API_URL = 'https://skyfitnesspro-202210-default-rtdb.europe-west1.firebasedatabase.app/'
const API_DOMAIN = 'firebasedatabase.app'

console.log(publicPath)

// Logging
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

function onProxyReq(proxyReq, req, res) {
  // add custom header to request
  // proxyReq.setHeader('x-added', 'foobar!!!')
  console.log('onProxyReq')
  // console.log('proxyReq -->', proxyReq.rawHeaders)
  // console.log('req -->', req.rawHeaders)

  if(req.body) {
    const isRefteshToken = req.url.includes('token?key=')
    if (isRefteshToken && req.body.refresh_token === undefined) {

      const tokens = req.headers.cookie

      if 
      const result = tokens.match(/refreshToken=(.[^;]*[^;]).*/)

      
          

    }


    let bodyData = JSON.stringify(req.body);
    // In case if content-type is application/x-www-form-urlencoded -> we need to change to application/json
    proxyReq.setHeader('Content-Type','application/json');
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
    // Stream the content
    proxyReq.write(bodyData);
  }

  const headers = req.rawHeaders
  const tokens = headers.find(item => 
    (item.includes('refreshToken'))
  )
  // const result = tokens.match(/refreshToken=(.[^;]*[^;]).*/)
  // console.log('tokens -->', tokens)
  // console.log(result[1])

  // console.log('req -->', req)
  console.log('req.headers.cookie -->', req.headers.cookie)

  console.log('token?key=', req.url.includes('token?key='))
  console.log('body =', req.body)
  
}

// function onProxyReq(proxyRes, req, res) {
//   // proxyRes.headers['x-added'] = 'foobar'
   
//   modifyResponse(res, proxyRes, body => {
//     if (body?.refreshToken) {
//       res.cookie('refreshToken', body?.refreshToken, {
//         // domain: `${API_SERVICE_DOMAIN}`,
//         httpOnly: true
//       })
//       // res.cookie('idToken', body?.idToken, { httpOnly: true })
//       console.log('res -->', res)
//     }
//     return body
//   })
//  }


function onProxyRes(proxyRes, req, res) {
  // proxyRes.headers['x-added'] = 'foobar'
   
  modifyResponse(res, proxyRes, body => {
    if (body?.refreshToken) {
      res.cookie('refreshToken', body?.refreshToken, {
        // domain: `${API_SERVICE_DOMAIN}`,
        httpOnly: true
      })
      // res.cookie('idToken', body?.idToken, { httpOnly: true })
      // console.log('res -->', res)
    }
    return body
  })
 }

// Proxy endpoints
app.use('/proxy', createProxyMiddleware({
   target: API_SERVICE_URL,
   changeOrigin: true,
   pathRewrite: {
       [`^/proxy`]: '',
   },
   onProxyRes,
   onProxyReq
}))

app.use(express.static(publicPath))

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
 })

app.listen(port, () => {
   console.log(`Server is up on port ${port}!`)
})
