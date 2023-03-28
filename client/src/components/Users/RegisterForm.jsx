import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../actions/auth';
import { SET_AlERT } from '../../reducers/alertSlice';

const RegisterForm = () => {

  const dispatch = useDispatch();
  const { register } = useAuth();


  const [registerFormData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const { name, email, password, confirmPassword } = registerFormData;

  const onChange = e => setFormData({
    ...registerFormData,
    [e.target.name]: e.target.value
  })

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(SET_AlERT({ msg: 'Password mismatch' }))
    } else {
      const success = await register({ name, email, password });
      if (success) {
        dispatch(SET_AlERT({ msg: 'User registered succesfully' }))
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
    }
  }

  return (
    <div className='mx-5 text-center'>
      <Container className='sm-container'>
        <Row>
          <Col>
            <Form className='p-5' onSubmit={e => onSubmit(e)}>

              <Form.Group className="mb-4" controlId="formName">
                <Form.Control size='lg' type="text" placeholder="Enter name" name='name' value={name} onChange={e => onChange(e)} required />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Control size='lg' type="email" placeholder="Enter email" name='email' value={email} onChange={e => onChange(e)} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Control size='lg' type="password" placeholder="Password" name='password' value={password} onChange={e => onChange(e)} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Control size='lg' type="password" placeholder="Confirm Password" name='confirmPassword' value={confirmPassword} onChange={e => onChange(e)} required />
              </Form.Group>

              <Button type="submit" size='lg' variant="outline-success x-large-btn" value="Register" >
                Register
              </Button>
              <hr />
              <p>Already have an account? <a href='/'>Sign in</a></p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default RegisterForm;

