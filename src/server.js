import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'

import App from './App'
import renderAssets from './lib/renderAssets'

const makeServerMiddleware = ({ files }) => {
  const { cssLinks, scripts } = renderAssets(files)
  // Returns middleware
  return (req, res) => {
    const renderedApp = ReactDOMServer.renderToString(
      <StaticRouter location={req.path} context={{ req, res }}>
        <App />
      </StaticRouter>
    )
    const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <title>React App</title>
        ${cssLinks}
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">${renderedApp}</div>
        ${scripts}
      </body>
    </html>`
    res.send(html)
  }
}

export default makeServerMiddleware