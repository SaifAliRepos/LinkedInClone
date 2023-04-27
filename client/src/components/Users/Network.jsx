import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {
  AcceptRequest,
  CancelRequest,
  RequestConnection,
  getSuggestedConnections,
  getUsers,
} from '../../actions/user';
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import MyNetwork from '../../icons/network';
import Community from '../../icons/community';
import Posts from '../../icons/posts';
import Cancel from '../../icons/cancel';
import Accept from '../../icons/accept';
import Linkedin from '../../icons/linkedin';
import ConnectCard from './ConnectCard';
import { useMediaQuery } from 'react-responsive';

const Network = () => {
  const activeUserId = useSelector((state) => state.auth.user?._id);

  const isSmallScreen = useMediaQuery({ maxWidth: 600 });

  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  const fetchData = async () => {
    let fetchedUsers = await getUsers();
    let suggestedUsers = await getSuggestedConnections();
    setReceivedRequests(
      fetchedUsers.find((obj) => obj._id === activeUserId).received_requests,
    );
    setSentRequests(
      fetchedUsers.find((obj) => obj._id === activeUserId).sent_requests,
    );
    setSuggestedUsers(suggestedUsers);
  };

  const handleCancelRequest = async (userId) => {
    await CancelRequest(userId);
    fetchData();
  };

  const handleAcceptRequest = async (userId) => {
    await AcceptRequest(userId);
    fetchData();
  };

  const handleSentRequest = async (userId) => {
    await RequestConnection(userId);
    fetchData();
  };

  useEffect(() => {
    console.log('fired');
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='bg-gray'>
      <Container className={isSmallScreen ? 'p-0' : 'p-5'}>
        <Row className={isSmallScreen ? 'px-0' : 'px-5'}>
          <Col xs={{ order: 'last' }} lg={{ order: 'first' }}>
            <Card>
              <Card.Body>
                <Card.Title>
                  <strong className='text-secondary'>Manage My Network</strong>
                </Card.Title>
                <Card.Text>
                  Some quick example{' '}
                  <strong className='blue'>text to build on the card</strong>{' '}
                  title and make up the bulk of the card's content.
                </Card.Text>
              </Card.Body>
              <ListGroup className='list-group-flush'>
                <ListGroup.Item>
                  <MyNetwork />
                  <span className='mx-2'>Your Network</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Community />
                  <span className='mx-2'>Connections</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Posts />
                  <span className='mx-2'>Manage Posts</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <MyNetwork />
                  <span className='mx-2'>Your Network</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Community />
                  <span className='mx-2'>Connections</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Posts />
                  <span className='mx-2'>Manage Posts</span>
                </ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Card.Link href='#'>Card Link</Card.Link>
                <Card.Link href='#'>Another Link</Card.Link>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <Card.Title>
                  <strong className='text-secondary'>Others</strong>
                </Card.Title>
                <Card.Text>
                  Some quick example{' '}
                  <strong className='blue'>text to build on the card</strong>{' '}
                  title and make up the bulk of the card's content.
                </Card.Text>
              </Card.Body>
              <ListGroup className='list-group-flush'></ListGroup>
              <Card.Body className='text-center'>
                <Linkedin />
                <br />
                <small>Privacy policy</small>
                <br />
                <small>Terms Coditions</small>
                <br />
                <small>Usage Policy</small>
                <br />
                <small>Accessiblity</small>
                <br />
                <small>Help Center</small>
                <br />
                <br />
                <Card.Link href='#'>Card Link</Card.Link>
                <br />
                <Card.Link href='#'>Another Link</Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={9} className='mb-4'>
            <section className='bg-white p-4 rounded border'>
              <h5 className='mb-5'>
                <strong>Pending requests</strong>
              </h5>
              <ul className='list-unstyled'>
                {receivedRequests.map((request) => (
                  <li key={request._id}>
                    <div className='d-flex align-items-center'>
                      <Image
                        width={'60px'}
                        className='rounded-circle border'
                        src='https://statinfer.com/wp-content/uploads/dummy-user.png'
                        alt='Profile picture'
                      />
                      <div className='d-inline-block mx-2 bg-white px-2 py-1 rounded'>
                        <strong className='d-flex mx-2'>
                          {request.name} -&nbsp;
                          <span className='text-secondary'>
                            {request.email}
                          </span>
                        </strong>
                        <Button
                          size='sm'
                          className='d-inline'
                          variant='transparent'
                          onClick={() => handleCancelRequest(request.user)}
                        >
                          <strong>Ignore</strong> <Cancel />
                        </Button>
                        <Button
                          size='sm'
                          className='d-inline'
                          variant='transparent'
                          onClick={() => handleAcceptRequest(request.user)}
                        >
                          <strong>Accept</strong> <Accept />
                        </Button>
                      </div>
                    </div>

                    <hr className='offset-1' />
                  </li>
                ))}
              </ul>
            </section>
            <br />
            <section className='bg-white p-4 rounded border'>
              <h5>
                <strong>People you might know</strong>
              </h5>
              {suggestedUsers.map((user) => {
                return (
                  <Row key={user._id} className='text-center mt-5 d-inline'>
                    <Col lg={4} className='d-inline-block mx-2 mt-4'>
                      {/* <div className='rounded border'>
                        <div className='bg-dark rounded-top py-5'> </div>
                        <Card.Img
                          className='img-fluid rounded-circle mx-auto d-block w-50 mt-neg-profile'
                          src='https://statinfer.com/wp-content/uploads/dummy-user.png'
                          alt='Profile picture'
                        />
                        <Card.Body>
                          <Card.Title className='my-2'>
                            <strong>{user.name}</strong>
                          </Card.Title>
                          <span className='text-secondary'>
                            <small>
                              <strong>
                                {' '}
                                Software Engineer at Devsinc | MERN | ROR | AWS
                                | Shopify
                              </strong>
                            </small>
                          </span>
                        </Card.Body>
                        <Card.Body>
                          <Button
                            size='sm'
                            className='my-3'
                            variant='outline-success px-5 rounded'
                            onClick={() => handleSentRequest(user._id)}
                            disabled={sentRequests.some(
                              (usr) => usr.user === user._id,
                            )}
                          >
                            <Connect />
                            {sentRequests.some((usr) => usr.user === user._id)
                              ? 'Requested'
                              : 'Connect'}
                          </Button>
                        </Card.Body>
                      </div> */}
                      <ConnectCard
                        user={user}
                        handleSentRequest={handleSentRequest}
                        sentRequests={sentRequests}
                      />
                    </Col>
                  </Row>
                );
              })}
            </section>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Network;
