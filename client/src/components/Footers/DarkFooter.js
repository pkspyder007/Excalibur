/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function DarkFooter() {
  return (
    <footer className="footer" data-background-color="blue">
      <Container>
        <nav>
          <ul>

            <li>
              <a
                href="#pablo"
                target="_blank"
              >
                About Us
              </a>
            </li>

          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Coded by with &hearts;{" Praveen "}

          .
        </div>
      </Container>
    </footer>
  );
}

export default DarkFooter;
