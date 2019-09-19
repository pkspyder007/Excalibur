import React, { Component } from 'react'

export default class Logout extends Component {
  componentDidMount() {
    localStorage.setItem('ept-token', 'false')
    this.props.history.push('/')
  }
  render() {
    return (
      <div>

      </div>
    )
  }
}
