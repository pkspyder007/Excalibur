import React, { useState } from "react";
import axios from 'axios';
// reactstrap components
import {
  Container,
  Card,
  Button,
  CardBody,
  CardText
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import DarkFooter from "components/Footers/DarkFooter.js";
import ReactLoading from 'react-loading';
const config = require('../config')

function ProductList(props) {
  const userid = localStorage.getItem('ept-userid');
  const [msg, setMsg] = useState(false);
  const [loading, setLoading] = useState(false)
  const [Products, setProducts] = useState([]);

  React.useEffect(() => {
    if ((localStorage.getItem('ept-token') === 'false' || '')) {
      props.history.push('/login-page')
    } else {
      axios.post(`${config.server}/product/user`, { id: userid }).then(res => {
        setProducts(res.data)
        if (res.data.length < 1)
          setMsg('No Product found add a new product using homepage')
      })
    }
  }, [props.history]);


  const DeleteProduct = (e, dp) => {
    setLoading(true)
    axios.post(`${config.server}/product/delete`, { userid: userid, pid: e.target.value }).then(res => {
      if (res.data.success === true) {
        setLoading(false)
        props.history.push('/product-page')
      } else
        console.log('some error')
    })
  }

  return (
    <>
      <IndexNavbar />
      <div className="section section-javascript" id="javascriptComponents">
        <Container className="text-center">
          <h3 className="text-center">Product in your account </h3>
          {msg}
          {Products.map(product => {
            return (
              <Card key={Math.random()} style={{ width: "20rem", marginRight: '20px' }}>
                <CardBody styles={{ height: '150rem' }}>
                  <CardText className="text-left" >
                    <strong> Product Name</strong> : {product.name}<br />
                    <strong> Drop price </strong> : {product.dropPrice} <br />
                  </CardText><Button
                    color="primary"
                    href={product.link}
                    target="__blank"
                  >
                    Goto Product Page
          </Button>

                  <Button
                    style={{ marginLeft: "10px" }}
                    color="danger"
                    value={product.id}
                    onClick={
                      DeleteProduct
                    }
                  >
                    Delete {(loading) ? (
                      <ReactLoading className="text-center" type='spinningBubbles' color='white' height={'20%'} width={'20%'} />) : ''}
                  </Button>

                </CardBody>
              </Card>
            )
          })}
        </Container>
      </div>
      <DarkFooter />
    </>
  );
}

export default ProductList;
