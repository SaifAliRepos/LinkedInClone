import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux'

import { REMOVE_ALERT, REMOVE_ALERT_TEXT, SET_AlERT, SET_ALERT_TEXT } from '../../reducers/alertSlice';

const BasicLoginForm = () => {

  const dispatch = useDispatch()

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    login: ''
  })

  const { email, password } = loginFormData;

  const onChange = e => setLoginFormData({
    ...loginFormData,
    [e.target.name]: e.target.value
  })

  const onSubmit = e => {
    e.preventDefault();
    console.log(loginFormData)
    if (email !== password) {

    }
    dispatch(SET_AlERT())
    setTimeout(() => {
      dispatch(REMOVE_ALERT())
    }, 5000)
  }

  return (
    <div className='mx-5 text-center'>
      <Form className='mx-4 p-5' onSubmit={e => onSubmit(e)}>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Control size='lg' type="email" placeholder="Enter email" name='email' value={email} onChange={e => onChange(e)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control size='lg' type="password" placeholder="Password" name='passowrd' value={password} onChange={e => onChange(e)} required />
        </Form.Group>
        <Button type="submit" size='lg' variant="primary x-large-btn" value='Login'>
          Login
        </Button>
        <hr />
        <Button href='/register' size='lg' variant="light x-large-btn" className='text-center'>
          Register
        </Button>
      </Form>
    </div>

  );
}

export default BasicLoginForm;
