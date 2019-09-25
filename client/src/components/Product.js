import React from "react";
// reactstrap components
import {
  Container,
  Card,
  Button,
  CardImg,
  CardBody,
  CardText
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import DarkFooter from "components/Footers/DarkFooter.js";


function ProductList() {
  return (
    <>
      <IndexNavbar />
      <div className="section section-javascript" id="javascriptComponents">
        <Container>
          <h3 className="text-center">Product Details</h3>
          <Card style={{ width: "20rem" }}>
            <CardImg
              alt="..."
              src={require('../assets/img/eva.jpg')}
              top
            ></CardImg>
            <CardBody>
              <CardText>
                Product Name : Canon Dslr <br />
                Current Price : $XXX <br />
                Drop price : $XXX <br />
              </CardText><Button
                color="primary"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                Go somewhere
          </Button>

            </CardBody>
          </Card>
        </Container>
      </div>
      <DarkFooter />
    </>
  );
}

export default ProductList;
