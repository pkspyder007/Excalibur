import React from "react";
import Axios from 'axios';
// reactstrap components
import {
  Alert,
  Button,
  Container,
  Modal,
  ModalBody,
  Input,
  Row,
  Col
} from "reactstrap";
import ReactLoading from 'react-loading';
// core components


function Javascript(props) {
  const [modal1, setModal1] = React.useState(false);
  const [modal2, setModal2] = React.useState(false);
  const [amzLink, setAmzLink] = React.useState(false);
  const [flipLink, setFlipLink] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState(false);
  const [msgerr, setMsgerr] = React.useState(false);
  const [drop, setDrop] = React.useState(false);

  const addAmz = () => {
    if (amzLink === false || drop === "false") {
      setMsgerr('Please Enter Both Fields');
      setLoading(false)
    } else {

      Axios.post(`//localhost:5000/product/add/amazon`, {
        product: {
          link: amzLink,
          userid: localStorage.getItem('ept-userid'),
          dropPrice: drop
        }
      }).then(res => {
        if (res.data.success === true) {
          setLoading(false);
          setMsg('Product Added')
          setModal2(false)
        } else {
          setLoading(false)
          setMsg('Some Thing went wrong while Retrieving Product')
        }
      })
    }
  }

  const addFlip = () => {
    if (flipLink === false || drop === "false") {
      setMsgerr('Please Enter Both Fields');
      setLoading(false)
    } else {

      Axios.post(`//localhost:5000/product/add/flipkart`, {
        product: {
          link: flipLink,
          userid: localStorage.getItem('ept-userid'),
          dropPrice: drop
        }
      }).then(res => {
        if (res.data.success === true) {
          setLoading(false);
          setMsg('Product Added')
          setModal1(false)
        } else {
          setLoading(false)
          setMsg('Some Thing went wrong while Retrieving Product')
        }
      })
    }
  }


  return (
    <>
      <div className="section section-javascript" id="javascriptComponents">
        <Container>
          <Row id="modals">
            <Col className="text-center">
              <h4>FlipKart</h4>
              <Button
                color="warning"
                className="mr-1"
                onClick={() => setModal1(true)}
              >
                Add From FlipKart
              </Button>
              <Modal isOpen={modal1} toggle={() => setModal1(false)}>
                <div className="modal-header justify-content-center">
                  <button
                    className="close"
                    type="button"
                    onClick={() => setModal1(false)}
                  >
                    <i className="now-ui-icons ui-1_simple-remove"></i>
                  </button>
                  <h4 className="title title-up">FlipKart</h4>
                </div>
                {(msgerr) ? (<Alert color="danger">{msgerr}</Alert>) : false}
                <ModalBody>
                  <p className="text-center">
                    Enter complete url with https and www
                  </p>
                  <Input placeholder="Enter Flipkart Product URL" onChange={(e) => setFlipLink(e.target.value)}></Input>
                  <br />
                  <Input placeholder="Enter drop proce" onChange={(e) => setDrop(e.target.value)}></Input>
                </ModalBody>
                <div className="modal-footer">
                  <Button color="success" type="button" onClick={(e) => {
                    setLoading(true);
                    addFlip();
                  }}>
                    Add
                  </Button>
                  {(loading) ? (
                    <ReactLoading type='spinningBubbles' color='black' height={'20%'} width={'20%'} />) : ''}

                  <Button
                    color="danger"
                    type="button"
                    onClick={() => {
                      setModal1(false);
                      setMsgerr(false)
                    }}
                  >
                    Close
                  </Button>
                </div>
              </Modal>
            </Col>
            <Col className="text-center">
              <h4>Amazon</h4>
              <Button
                color="primary"
                className="mr-1"
                onClick={() => setModal2(true)}
              >
                Add from Amazon
              </Button>
              <Modal isOpen={modal2} toggle={() => setModal2(false)}>
                <div className="modal-header justify-content-center">
                  <button
                    className="close"
                    type="button"
                    onClick={() => { setModal2(false); }}
                  >
                    <i className="now-ui-icons ui-1_simple-remove"></i>
                  </button>
                  <h4 className="title title-up">Amazon</h4>
                </div>
                {(msgerr) ? (<Alert color="danger">{msgerr}</Alert>) : false}
                <ModalBody>
                  <p className="text-center">
                    Enter complete url with https and www
                  </p>
                  <Input placeholder="Enter amazon product URL" onChange={(e) => setAmzLink(e.target.value)}></Input>
                  <br />
                  <Input placeholder="Enter drop proce" onChange={(e) => setDrop(e.target.value)}></Input>
                </ModalBody>
                <div className="modal-footer">
                  <Button color="success" type="button" onClick={(e) => {
                    setLoading(true);
                    addAmz();
                  }}>
                    Add
                </Button>
                  {(loading) ? (
                    <ReactLoading type='spinningBubbles' color='black' height={'20%'} width={'20%'} />) : ''}

                  <Button
                    color="danger"
                    type="button"
                    onClick={() => {
                      setModal2(false);
                      setMsgerr(false)
                    }}
                  >
                    Close
                  </Button>
                </div>
              </Modal>
            </Col>
          </Row>
          <p className="text-center">{msg}</p>
        </Container>

      </div>
    </>
  );
}

export default Javascript;
