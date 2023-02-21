import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Linkedin from '../icons/linkedin';
import Posts from '../icons/posts';
import Profile from '../icons/profiles'

const NavScrollExample = () => {
  return (
    <div className='mx-5'>
      <Navbar expand="lg" className='mx-5 my-3'>
        <Container>
          <Navbar.Brand href="/"><span className="my-4 mx-1 h3 blue">m i n i LINKED</span><Linkedin /></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            </Nav>
            <Nav.Link href="/profiles" className='text-center'><Profile />
              <br /><span className='gray-text'>Profile</span></Nav.Link>
            <Nav.Link href="/posts" className='text-center'><Posts /><br /><span className='gray-text mx-4'>Posts</span></Nav.Link>

            <div className="vr mx-3"></div>
            <Form className="d-flex">
              <Button href='/register' variant="outline-danger" className=' mx-2 rounded-5' size="lg">Register</Button>
              <Button href='/' variant="outline-primary" className='rounded-5' size="lg">Login</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div >

  );
}

export default NavScrollExample;
