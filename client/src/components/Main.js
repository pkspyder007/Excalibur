import React, { Component } from 'react'
import axios from "axios";
const config = require('../config/config')

export default class Main extends Component {
  state = {
    amzLink: '',
    flipLink: '',
    amzDrop: '',
    flipDrop: '',
    err: ''
  }
  amzlink = (e) => {
    this.setState({ amzLink: e.target.value })
  }

  fliplink = (e) => {
    this.setState({ flipLink: e.target.value })
  }

  amzDrop = (e) => {
    this.setState({ amzDrop: e.target.value })
  }

  flipDrop = (e) => {
    this.setState({ flipDrop: e.target.value })
  }

  trackAmz = () => {
    if (!this.state.amzLink) {
      this.setState({ err: 'Plese enter Amazon Product Url' })
      if (!this.state.amzDrop) {
        this.setState({ err: 'Plese enter drop price' })
      }
    } else {
      this.setState({ err: 'Plese wait retrieving product' })
      const product = {
        userid: localStorage.getItem('ept-userid'),
        link: this.state.amzLink,
        dropPrice: this.state.amzDrop
      };
      axios.post(`${config.server}/product/add/amazon`, { product })
        .then(res => {
          if (res.data.success)
            this.setState({ err: 'Product Added', amzDrop: '', amzLink: '' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  trackFlip = () => {
    if (!this.state.flipLink) {
      this.setState({ err: 'Plese enter Flipkart Product Url' })
      if (!this.state.flipDrop) {
        this.setState({ err: 'Plese enter Drop price' })
      }
    } else {
      this.setState({ err: 'Plese wait retrieving product' })
      const product = {
        userid: localStorage.getItem('ept-userid'),
        link: this.state.flipLink,
        dropPrice: this.state.flipDrop
      };
      axios.post(`${config.server}/product/add/flipkart`, { product })
        .then(res => {
          if (res.data.success)
            this.setState({ err: 'Product Added', flipLink: '', flipDrop: '' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  render() {
    return (
      <div>
        <center className='red'>{this.state.err}</center>
        <div className="">
          <input type="text" placeholder="Amazon Link" onChange={this.amzlink} />
          <br />
          <input type="text" placeholder="Drop Price" onChange={this.amzDrop} />
          <button onClick={this.trackAmz}>Track On Amazon</button>
        </div>
        <div className="">
          <input type="text" placeholder="Flipkart Link" onChange={this.fliplink} />
          <br />
          <input type="text" placeholder="Drop Price" onChange={this.flipDrop} />
          <button onClick={this.trackFlip}>Track On FlipKart</button>
        </div>
      </div>
    )
  }
}
