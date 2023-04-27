import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../actions/auth';
import { useMediaQuery } from 'react-responsive';

const BasicLoginForm = () => {
  const isMediumScreen = useMediaQuery({ maxWidth: 1000 });
  const isSmallScreen = useMediaQuery({ maxWidth: 600 });

  let navigate = useNavigate();
  const { login, auth } = useAuth();

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = loginFormData;

  const onChange = (e) =>
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    const loggedIn = await login(email, password);
    if (loggedIn) {
      auth();
      navigate('posts');
    }
  };

  return (
    <div className={isMediumScreen ? '' : 'offset-1'}>
      <Form className=' offset-1 my-3' onSubmit={(e) => onSubmit(e)}>
        <Form.Group className='mb-4' controlId='formBasicEmail'>
          <Form.Control
            size='lg'
            type='email'
            placeholder='Enter email'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Control
            size='lg'
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3 text-center' controlId='formBasicPassword'>
          <Button
            type='submit'
            size='lg'
            variant={isSmallScreen ? 'primary px-5' : 'primary x-large-btn'}
            value='Login'
          >
            Login
          </Button>
          <hr />
          <Button
            onClick={() => navigate('/register')}
            size='lg'
            variant={isSmallScreen ? 'light px-5' : 'light x-large-btn'}
          >
            Register
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default BasicLoginForm;
