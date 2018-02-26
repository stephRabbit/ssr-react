import React from 'react'

const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true
  return (
    <div className="center-align" style={{ marginTop: '40%' }}>
      <h1 className="flow-text">Oops, Page not found!</h1>
    </div>
  )
}

export default {
  component: NotFoundPage
}