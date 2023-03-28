import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { usePost } from '../../actions/posts';
import Button from 'react-bootstrap/Button';
import NewPost from './NewPost';
import { useMediaQuery } from 'react-responsive';
import Bag from '../../icons/bag';
import Share from '../../icons/share';
import KitchenSinkExample from '../Utils/ProfileStats';
import Image from 'react-bootstrap/Image';
import Gallery from '../../icons/image';
import ViewPost from './ViewPost';
import Heart from 'react-heart';
import Comments from './Comments/Comments';

export const Posts = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 576 });

  const { getPosts, removePost, likePost } = usePost();

  const [posts, setPosts] = useState([]);
  const [active, setActive] = useState(false);

  const fetchData = async () => {
    let fetchedPosts = await getPosts();
    setPosts(fetchedPosts.articles);
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
    <div>
      <Container>
        <div className='text-center py-2 my-3 bg-light'>
          <Gallery /> &nbsp;&nbsp; <Bag /> &nbsp;&nbsp; <Share />
        </div>

        <Row>
          <Col className='text-center d-md-none d-lg-block'>
            <KitchenSinkExample />
          </Col>
          <Col md={6} className='bg-light border shadow'>
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
                      <h5 className='d-inline'>
                        <strong>{post.title}</strong>
                      </h5>
                      <div>
                        <p className='text-secondary'></p>
                        <p>{post.description}</p>
                      </div>
                      <Image
                        fluid
                        className='mb-4'
                        src='https://fakeimg.pl/440x320/282828/eae0d0/?retina=1'
                        alt=''
                        width={'570px'}
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
          <Col md={3} className='text-center mt-3'>
            <div className={isSmallScreen ? 'p-4' : 'position-fixed'}>
              <h3 className='mb-3'>Create a new post</h3>
              <NewPost actionBtn='Post' fetchData={fetchData} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
