import React, { Fragment, useContext, useEffect, useState } from 'react';
import ProfileTabs from './ProfileTabs';
import { usePost } from '../../actions/posts';
import { useParams } from 'react-router-dom';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/esm/Row';
import Connect from '../../icons/connect';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';
import Linkedin from '../../icons/linkedin';
import ConnectCard from '../Users/ConnectCard';
import { RequestConnection } from '../../actions/user';
import { PostContext } from '../Context/PostsContext';

const RecentActivity = () => {
  // const { posts, handleRemovePost, fetchData } = useContext(PostContext);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  // // useEffect(() => {
  // //   console.log('fired in recent');
  // //   fetchData();
  // //   console.log(userPosts);
  // //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // // }, [user_id]);

  return (
    <div className='bg-gray py-5'>
      <Container className='px-5'>
        <Row>
          <Col md={3} className='text-center d-none d-lg-block mx-3'>
            {/* <ConnectCard
              user={userPosts[0].user}
              // handleSentRequest={handleSentRequest}
              // sentRequests={sentRequests}
            /> */}
            <Card className='mx-3'>
              <Card.Img
                variant='top'
                src='https://marketplace.canva.com/EAFMXtw7OMI/1/0/1135w/canva-blue-beige-simple-job-vacancy-announcement-j8CIXadGE_k.jpg'
              />
              <Card.Body>
                <Card.Text className='text-center'>
                  Building your <strong>profile is key</strong> to success rate,
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Fragment>
              <ProfileTabs />
            </Fragment>
          </Col>
          <Col className='text-center mt-2'>
            <div className='text-center'>
              <br />
              <small>Privacy policy &nbsp;</small>
              <small>Terms Coditions</small>
              <br />
              <small>Usage Policy&nbsp;</small>
              <small>Accessiblity</small>
              <br />
              <small>Help Center</small>
              <br />
              <br />
              <Linkedin /> <strong> Corporation 2023</strong>
              <br />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RecentActivity;
