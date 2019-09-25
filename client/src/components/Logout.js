import React, { Component } from 'react'

export default class Logout extends Component {
  componentDidMount() {
    localStorage.setItem('ept-token', 'false')
    localStorage.setItem('ept-userid', 'false')
    this.props.history.push('/login-page')
  }
  render() {
    return (
      <div>

      </div>
    )
  }
}
