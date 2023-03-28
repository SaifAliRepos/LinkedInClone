import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../actions/auth';

const BasicLoginForm = () => {
  let navigate = useNavigate();
  const { login, auth } = useAuth();

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = loginFormData;

  const onChange = e => setLoginFormData({
    ...loginFormData,
    [e.target.name]: e.target.value
  })

  const onSubmit = async (e) => {
    e.preventDefault();
    const loggedIn = await login(email, password);
    if (loggedIn) {
      auth();
      navigate('posts')
    }
  }

  return (
    <div className='offset-1 text-center'>
      <Form className='offset-1 my-4' onSubmit={e => onSubmit(e)}>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Control size='lg' type="email" placeholder="Enter email" name='email' value={email} onChange={e => onChange(e)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control size='lg' type="password" placeholder="Password" name='password' value={password} onChange={e => onChange(e)} required />
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
