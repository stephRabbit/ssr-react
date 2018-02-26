import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

export default (ChildComponent) =>  {
  class RequireAuth extends Component {
    render() {
      switch (this.props.auth) {
        case false:
          return <Redirect to="/" />
        case null:
          return (
            <div>
              <p className="flow-text">Loading...</p>
            </div>
          )
        default:
          return (
            <div>
              <p className="flow-text">Welcome, good to see you again.</p>
              <ChildComponent {...this.props} />
            </div>
          )
      }
    }
  }

  const mapStateToProps = ({ auth }) => ({ auth })

  return connect(mapStateToProps)(RequireAuth);
}