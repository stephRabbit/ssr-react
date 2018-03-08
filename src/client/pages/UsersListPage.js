import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { fetchUsers } from '../actions'

class UsersListPage extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  renderUsers() {
    return this.props.users.map(user => {
      return <li key={user.id}>{user.name}</li>
    })
  }

  head() {
    return (
        <Helmet>
          <title>{`${this.props.users.length} Users Loaded`}</title>
          <meta property="og:title" content="User App" />
        </Helmet>
    )
  }

  render() {
    return (
      <div>
        {this.head()}
        <h1>User List</h1>
        <ul>
          {this.renderUsers()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ users }) => ({
  users
})

const loadData = store => store.dispatch(fetchUsers())

export default {
  loadData,
  component: connect(mapStateToProps, { fetchUsers })(UsersListPage)
}