import React, { Component } from 'react'
import Navbar from './Navbar'
import Main from './Main'


export default class Home extends Component {



  render() {
    return (
      <div>
        <Navbar />
        {(localStorage.getItem('ept-userid')) === 'false' || '' ? (<p>Please Log IN</p>) : (
          <div>
            <Main />

          </div>
        )}
      </div>
    )
  }
}
