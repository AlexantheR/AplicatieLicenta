import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Row, Col } from "reactstrap";

export default props => {

  return (
    <div>
      <Row noGutters className="text-center align-items-center pizza-cta">
        <Col>
          <p className="looking-for-pizza">
            If you're looking for great pizza
            <i className="fas fa-pizza-slice pizza-slice"></i>
          </p>
          <Link
            className="book-table-btn"
            to="/book"
          >
            Book a Table
          </Link>
        </Col>
      </Row>
      <Row noGutters className="text-center big-img-container">
        <Col>
          <img
            src={require("../images/cafe.jpg")}
            alt="cafe"
            className="big-img"
          />
        </Col>
      </Row>
    </div>
  );
};
