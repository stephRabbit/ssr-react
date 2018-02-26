import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAdmins } from '../actions'
import requireAuth from '../components/hocs/requireAuth'

class AdminsListPage extends Component {
  componentDidMount() {
    this.props.fetchAdmins()
  }

  renderAdmins() {
    return this.props.admins.map(admin => {
      return <li key={admin.id}>{admin.name}</li>
    })
  }

  render() {
    return (
      <div>
        <h1>Admins List</h1>
        <ul>
          {this.renderAdmins()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ admins }) => ({
  admins
})

const loadData = store => store.dispatch(fetchAdmins())

export default {
  loadData,
  component: connect(mapStateToProps, { fetchAdmins })(requireAuth(AdminsListPage))
}