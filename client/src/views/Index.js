import React from "react";

// reactstrap components
// import {
// } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import DarkFooter from "components/Footers/DarkFooter.js";

// sections for this page

import Javascript from "./index-sections/Javascript.js";//Modals
import Carousel from "./index-sections/Carousel.js";

function Index(props) {
  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  React.useEffect(() => {
    if ((localStorage.getItem('ept-token') === 'false' || '')) {
      props.history.push('/login-page')
    }
  }, [props.history]);

  return (
    <>
      <IndexNavbar />

      <div className="wrapper">
        <div className="main">
          <Javascript />
          <Carousel />
          <br />
        </div>
        <DarkFooter />
      </div>
    </>
  );
}

export default Index;

// 
// <BasicElements />
// <Navbars />
// 
// <Pagination />
// <Notifications />
// <Typography />
// <Javascript />
// <Carousel />
// <NucleoIcons />
// <CompleteExamples />
// <SignUp />
// <Examples />
// <Download />