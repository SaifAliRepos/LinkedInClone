import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { usePost } from '../../actions/posts';
import Button from 'react-bootstrap/Button';
import NewPost from './NewPost';
import { useMediaQuery } from 'react-responsive';
import Image from 'react-bootstrap/Image';
import ViewPost from './ViewPost';
import Heart from 'react-heart';
import Comments from './Comments/Comments';
import ProfileStats from '../Utils/ProfileStats';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export const Posts = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 576 });

  const { getPosts, removePost, likePost } = usePost();

  const [posts, setPosts] = useState([]);
  const [active, setActive] = useState(false);

  const fetchData = async () => {
    let fetchedPosts = await getPosts();
    setPosts(fetchedPosts?.articles);
  };

  const handleRemovePost = async (id) => {
    await removePost(id);
    fetchData();
  };

  useEffect(() => {
    console.log('fired');
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removePost]);

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
          <Col md={3} className='text-center d-md-none d-lg-block'>
            <ProfileStats />
          </Col>
          <Col md={6} className='bg-white border shadow rounded'>
            <div className='my-3'>
              {posts && posts.length > 0 ? (
                <ul>
                  {posts.map((post) => (
                    <li key={post._id}>
                      <p>
                        <strong>{post.user.name}</strong>
                        <small className='d-flex'>{post.user.email}</small>
                        <small className='d-flex'>{post.date}</small>
                      </p>
                      <strong className='d-inline'>{post.title}</strong>
                      <div>
                        <p className='text-secondary'></p>
                        <p>{post.description}</p>
                      </div>
                      <Image
                        fluid
                        className='mb-4'
                        src={post.img}
                        alt=''
                        width={'540px'}
                      />
                      <p className='d-flex mx-3 mt-neg'>
                        <strong>{post.like.length} Likes &nbsp;&nbsp;</strong>
                        <strong>{post.comments.length} comments</strong>
                      </p>

                      <div className='mb-5'>
                        <div
                          className='d-inline-block mx-2'
                          style={{ width: '2rem' }}
                        >
                          <Heart
                            isActive={active}
                            onClick={async () => {
                              await likePost(post._id);
                              fetchData();
                              setActive(!active);
                            }}
                          />
                        </div>
                        <ViewPost data={post} fetchData={fetchData} />
                        <Button
                          variant='outline-danger'
                          size='sm'
                          className='mx-2'
                          onClick={() => handleRemovePost(post._id)}
                        >
                          Delete
                        </Button>
                        <Comments
                          postId={post._id}
                          comments={post.comments}
                          fetchData={fetchData}
                        />
                        <hr />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No posts found</p>
              )}
            </div>
          </Col>
          <Col md={3} className='text-center mt-2'>
            <div className={isSmallScreen ? 'p-5' : 'position-fixed'}>
              <h3 className='mb-3'>Create a new post</h3>
              <NewPost actionBtn='Post' fetchData={fetchData} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
