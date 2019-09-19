import React, { Component } from 'react'

const config = require('../config/config')

export default class Navbar extends Component {
  state = {
    loggedin: false,
    token: ''
  }
  componentDidMount() {
    this.setState((prevState) => {
      this.state.token = localStorage.getItem('ept-token')
      if (this.state.token === 'false' || '') {
        this.setState({ loggedin: false })
      } else {
        this.setState({ loggedin: true })
      }
    })
  }

  render() {

    return (
      <div>
        <nav className="blue darken-3">
          <div className="nav-wrapper">
            <a href="/" className="brand-logo left">Track It Down</a>

            {(this.state.loggedin) ? (
              <ul className="right ">
                <li><a href="/profile">Profile</a></li>
                <li><a href="/logout">Logout</a></li>
              </ul>
            ) :
              (
                <ul className="right">
                  <li><a href={`${config.server}/auth/google`}>Login</a></li>
                </ul>
              )}

          </div>
        </nav>

      </div >
    )
  }
}
