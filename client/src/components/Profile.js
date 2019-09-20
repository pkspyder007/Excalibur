import React, { Component } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
const config = require('../config/config')

export default class Profile extends Component {
  state = {
    user: {},
    loading: true
  }
  componentDidMount() {
    if (localStorage.getItem('ept-userid') === 'false' || '') {
      this.props.history.push('/')
    } else {
      const userid = localStorage.getItem('ept-userid')
      axios.get(`${config.server}/user/${userid}`)
        .then(res => {
          this.setState({ user: res.data, loading: false })

        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        {(this.state.loading ? (
          <p>Loading...</p>
        ) : (
            <div className="card horizontal">
              <div className="card-image">
                <img src={this.state.user.pic} alt="user profile dp" />
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  Name : {this.state.user.name}
                  <br />
                  Email : {this.state.user.email}
                </div>
              </div>
            </div>
          ))}
        <br />
      </div>
    )
  }
}
