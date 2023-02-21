import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import BasicLoginForm from './Forms/LoginForm';

export const Introduction = () => {
  return (
    <div>
      <Row>
        <Col className='p-5'>
          <h1 className='offset-2 display-4'>Welcome to your professional community</h1>
          <BasicLoginForm />
        </Col>
        <Col className='text-end my-5'>
          <Image
            src=
            "https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4"
            width={"650px"}
          /></Col>
      </Row>
    </div>
  )
}
