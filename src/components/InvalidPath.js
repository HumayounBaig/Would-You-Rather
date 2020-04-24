import React from 'react';
import { Row, Col } from 'reactstrap';

function InvalidPath() {
    return (
      <Row>
        <Col>
          <div className="text-center">
            <h2 as="h3">Error 404 </h2>
            <p>Invalid Url please use Top Bar to navigate.</p>
          </div>
        </Col>
      </Row>
    );
}

export default InvalidPath;