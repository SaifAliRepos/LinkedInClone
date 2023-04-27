import React, { Fragment, useState } from 'react';
import { usePost } from '../../actions/posts';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import ViewPost from './ViewPost';
import Heart from 'react-heart';
import Comments from './Comments/Comments';
import { useParams } from 'react-router-dom';

const PostShow = (props) => {
  const { user_id } = useParams();
  const { likePost } = usePost();
  const [active, setActive] = useState(false);
  return (
    <Fragment>
      {props.posts && props.posts.length > 0 ? (
        <ul className='list-unstyled'>
          {props.posts.map((post) => (
            <li key={post._id} className='bg-white rounded border mb-2 p-4'>
              <p>
                <strong>{post?.user?.name}</strong>
                <small className='d-flex'>{post.date}</small>
              </p>
              <strong className='d-inline'>{post.title}</strong>
              <br />
              <p>{post.description}</p>

              <Image
                fluid
                className='cropped-image mb-4 border p-2'
                src={
                  post.img
                    ? post?.img?.split('-')[0]
                    : 'https://dummyimage.com/600x400/000/fff'
                }
                alt=''
              />
              <p className='d-flex mx-3 mt-neg'>
                <strong>{post.like.length} Likes &nbsp;&nbsp;</strong>
                <strong>{post.comments.length} comments</strong>
              </p>

              <div className='mb-2'>
                <div className='d-inline-block mx-2' style={{ width: '2rem' }}>
                  <Heart
                    isActive={active}
                    onClick={async () => {
                      await likePost(post._id);
                      props.fetchData(user_id);
                      setActive(!active);
                    }}
                  />
                </div>
                <ViewPost data={post} fetchData={props.fetchData} />
                <Button
                  variant='outline-danger'
                  size='sm'
                  className='mx-2'
                  onClick={() => props.handleRemovePost(post._id)}
                >
                  Delete
                </Button>
                <Comments
                  postId={post._id}
                  comments={post.comments}
                  fetchData={props.fetchData}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        'No posts found'
      )}
    </Fragment>
  );
};

export default PostShow;
