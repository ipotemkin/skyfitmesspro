const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

// const morgan = require("morgan")
const { createProxyMiddleware } = require('http-proxy-middleware')

const modifyResponse = require('node-http-proxy-json')

const app = express()
const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../..', 'build')

const API_SERVICE_URL = 'https://identitytoolkit.googleapis.com'

const getRefreshTokenFromCookiesString = (cookieString) => {
  const result = cookieString.match(/refreshToken=(.[^;]*[^;]).*/)
  if (result && result.length > 1 && result[1]) return result[1]
  return undefined
}

// Logging
// app.use(morgan('dev'))

// чтобы было доступно поле body 
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

function onProxyReq(proxyReq, req, res) {

  if(req.body) {
    const isRefreshToken = req.url.includes('token?key=')

    if (isRefreshToken && !req.body.refreshToken) {
      const newToken = getRefreshTokenFromCookiesString(req.headers.cookie)
      req.body.refreshToken = newToken
    }

    let bodyData = JSON.stringify(req.body)
    // In case if content-type is application/x-www-form-urlencoded -> we need to change to application/json
    proxyReq.setHeader('Content-Type','application/json')
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
    // Stream the content
    proxyReq.write(bodyData)
  }
}

function onProxyRes(proxyRes, req, res) {
  modifyResponse(res, proxyRes, body => {
    if (body?.refreshToken) {
      res.cookie('refreshToken', body?.refreshToken, {
        httpOnly: true
      })
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
