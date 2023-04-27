import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import BasicLoginForm from '../Users/LoginForm';
import { useMediaQuery } from 'react-responsive';

export const Introduction = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 600 });
  const isMediumScreen = useMediaQuery({ maxWidth: 1000 });
  return (
    <div>
      <Row>
        <Col className='p-5'>
          <h1 className={isMediumScreen ? 'offset-1 display-4' : 'offset-2 display-4'}>Welcome to your professional community</h1>
          <BasicLoginForm />
        </Col>
        <Col className={isSmallScreen ? 'd-none' : 'text-end my-5'}>
          <Image
            src=
            "https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4"
            width={"650px"}
          /></Col>
      </Row>
    </div>
  )
}
