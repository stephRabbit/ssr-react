import 'babel-polyfill'
import express from 'express'
import proxy from 'express-http-proxy'
import { matchRoutes } from 'react-router-config'
import Routes from './client/Routes'
import renderer from './helpers/renderer'
import createStore from './helpers/store'

const app = express()

// Proxy - any route with /api
app.use(
  '/api',
  proxy('http://react-ssr-api.herokuapp.com/', {
    proxyReqOptDecorator(options) {
      // Only used for current API - security errors google oauth
      options.headers['x-forwarded-host'] = 'localhost:3000'
      return options
    }
  }))

// Access to public
app.use(express.static('public'))

// Request to root route
app.get('*', (req, res) => {
  const store = createStore(req)
  /**
   * Look at list of routes
   * and match them to request routes
   *
   * return [] - components
   */
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null
  })
  .map(promise => {
    // Check if it is a promise
    if (promise) {
      // Resolve all inner promises then pass to Promise.all
      return new Promise((resolve, reject) => {
        promise.then(resolve).catch(resolve)
      })
    }
  })

  Promise.all(promises).then(() => {
    const context = {}
    const content = renderer(req, store, context)

    if (context.url) { return res.redirect(301, context.url) }
    if (context.notFound) { res.status(404) }

    res.send(content)
  })
});

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
