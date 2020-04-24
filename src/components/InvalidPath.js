import React from 'react';
import { Row, Col } from 'reactstrap';

function InvalidPath() {
    return (
      <Row textAlign="center">
        <Col>
            <h2 as="h3">Error 404 </h2>
            <p>Invalid Url please use Top Bar to navigate.</p>
        </Col>
       
      </Row>
    );
}

export default InvalidPath;