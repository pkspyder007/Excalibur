import React, { Component } from 'react'


export default class Login extends Component {
  state = {
    token: '',
    msg: ''
  }
  componentDidMount() {
    localStorage.setItem('ept-token', this.props.match.params.token.split('&')[0])
    localStorage.setItem('ept-userid', this.props.match.params.token.split('&')[1])
    this.setState({
      token: this.props.match.params.token.split('&')[0]
    })
    if (localStorage.getItem('ept-token') === 'false' || '') {
      this.setState({ msg: 'Error in logging in' })
      this.props.history.push('/login-page')
    } else {

      this.props.history.push('/')
    }

  }

  render() {
    return (
      <div>
      </div>
    )
  }
}
