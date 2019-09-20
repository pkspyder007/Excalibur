import React, { Component } from 'react'
import Axios from 'axios'
import Navbar from './Navbar'
const config = require('../config/config')

export default class Products extends Component {
  state = {
    products: []
  }
  componentDidMount() {
    Axios.post(`${config.server}/product/user/`, { id: localStorage.getItem('ept-userid') })
      .then(res => {
        this.setState({ products: res.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <Navbar />
        {(this.state.products.length === 0) ? (<h2>Sorry No products in your account yet</h2>) : (<h2>Your Products</h2>)}
        {this.state.products.map(p => {
          return (
            <div key={p._id}>
              Product Link : <a href={p.link} target="_blank">Click Here</a>
              Current Price : {p.currentPrice}
              DropPrice : {p.dropPrice}
              <br />
            </div>
          )
        })}

      </div>
    )
  }
}
