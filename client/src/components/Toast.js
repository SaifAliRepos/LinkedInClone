import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import { useSelector } from 'react-redux'

function AutohideToast() {

  const alert = useSelector((state) => state.alert.value);
  const alertText = useSelector((state) => state.alert.text);

  return (
    <Row>
      <Col xs={6}>
        <Toast onClose={() => { return alert }} show={alert} autohide>
          <Toast.Header>
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>{alertText}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}

export default AutohideToast;
