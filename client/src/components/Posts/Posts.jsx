import React, { useContext, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { usePost } from '../../actions/posts';
import Button from 'react-bootstrap/Button';
import NewPost from './NewPost';
import { useMediaQuery } from 'react-responsive';
import ProfileStats from '../Utils/ProfileStats';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import PostShow from './PostShow';
import { useParams } from 'react-router-dom';
import { PostContext } from '../Context/PostsContext';

export const Posts = () => {
  const { user_id } = useParams();
  const isSmallScreen = useMediaQuery({ maxWidth: 576 });

  const { posts, handleRemovePost, fetchData } = useContext(PostContext);

  useEffect(() => {
    console.log('fired in post show');
    fetchData(user_id);
  }, []);

  return (
    <div className='bg-gray py-5'>
      <Container className='px-5'>
        <div className='offset-3 w-50 mb-4'>
          <InputGroup>
            <Form.Control
              className='rounded-0'
              placeholder='What are you looking for?'
            />
            <Button variant='dark' className='rounded-0'>
              Search
            </Button>
          </InputGroup>
          <hr />
        </div>
        <Row>
          <Col md={3} className='text-center d-none d-lg-block'>
            <ProfileStats />
          </Col>
          <Col md={6} className='rounded p-0'>
            <PostShow
              posts={posts}
              fetchData={fetchData}
              handleRemovePost={handleRemovePost}
            />
          </Col>
          <Col md={3} className='text-center mt-2'>
            <div className={isSmallScreen ? 'p-auto mx-a' : 'position-fixed '}>
              <h3 className='mb-3'>Create a new post</h3>
              <NewPost actionBtn='Post' fetchData={fetchData} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
