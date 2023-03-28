import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import Linkedin from '../../icons/linkedin';
import Posts from '../../icons/posts';
import Profile from '../../icons/profiles';
import { LOGOUT } from '../../reducers/authSlice';

const NavScrollExample = () => {
  const activeUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div className='mx-5'>
      <Navbar expand='lg' className='mx-5 my-3'>
        <Container>
          <Navbar.Brand href='/'>
            <span className='my-4 mx-1 h3 blue'>m i n i LINKED</span>
            <Linkedin />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll'>
            <Nav
              className='me-auto my-2 my-lg-0'
              style={{ maxHeight: '100px' }}
              navbarScroll
            ></Nav>
            <Nav.Link className='mright-4' href='/profiles'>
              &nbsp;&nbsp;&nbsp;
              <Profile />
              <br />
              <span className='gray-text'>Profile</span>
            </Nav.Link>
            <Nav.Link className='mright-4' href='/posts'>
              &nbsp;&nbsp;
              <Posts />
              <br />
              <span className='gray-text'>Posts</span>
            </Nav.Link>

            <div className='d-none d-lg-block'>
              <div className='vertical-rule'></div>
            </div>

            <Form className='d-flex'>
              <Button
                href='/register'
                variant='outline-danger'
                className={activeUser ? 'd-none' : 'rounded-5 mx-2'}
                size='lg'
              >
                Register
              </Button>
              <Button
                href='/'
                variant='outline-primary'
                className={'rounded-5'}
                size='lg'
                onClick={() => activeUser && dispatch(LOGOUT())}
              >
                {activeUser ? 'Logout' : 'Login'}
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavScrollExample;
