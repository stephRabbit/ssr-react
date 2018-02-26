import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const Header = ({ auth }) => {
  console.log('auth: ', auth)

  // Anchor with /api in order to proxy to API
  const authButton = auth
    ? (
      <a href="/api/logout">Logout</a>
    )
    : (
      <a href="/api/auth/google">Login</a>
    )

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="left brand-logo">React SSR</Link>
        <ul className="right">
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/admins">Admins</Link></li>
          <li>{authButton}</li>
        </ul>
      </div>
    </nav>
  )
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(Header)