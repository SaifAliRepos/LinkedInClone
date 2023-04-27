import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Chat from '../../../icons/chat';
import { usePost } from '../../../actions/posts';
import Trash from '../../../icons/trash';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <button type='button' style={{ border: 'none' }} onClick={decoratedOnClick}>
      {children}
    </button>
  );
}

function Comments(props) {
  const { user_id } = useParams();

  const { addComment, deleteComment } = usePost();
  const [text, setComment] = useState('');

  const presentUser = useSelector((state) => state.auth.user?._id);

  const postId = props?.postId || '';

  const handleRemoveComment = async (commentId) => {
    await deleteComment(postId, commentId);
    props.fetchData(user_id);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setComment('');
    await addComment(postId, { text });
    props.fetchData();
  };

  return (
    <Accordion>
      <Card className='border-0 mt-3'>
        <Card.Header style={{ border: 'none', backgroundColor: 'transparent' }}>
          <CustomToggle eventKey='0'>
            <Chat />
            <strong className='mx-1'>Comments</strong>
          </CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey='0'>
          <Card.Body>
            <div className='mb-2'>
              {props.comments && props.comments.length > 0 ? (
                <ul>
                  {props.comments.map((comment) => (
                    <li key={comment._id}>
                      <p className='d-inline'>{comment.text}</p>

                      <Button
                        variant='tranparent'
                        size='sm'
                        className={
                          comment.user === presentUser ? 'mx-1' : 'd-none'
                        }
                        onClick={() => handleRemoveComment(comment?._id)}
                      >
                        <Trash />
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No comments found</p>
              )}
            </div>
            <Form onSubmit={onSubmit}>
              <Form.Group className='mb-4 w-50' controlId='formTitle'>
                <Form.Control
                  size='sm'
                  type='text'
                  placeholder='Enter new comment'
                  name='title'
                  value={text}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </Form.Group>
              <Button
                type='submit'
                size='sm px-2'
                variant='dark'
                value='Register'
              >
                {/* {props.actionBtn} */}
                Comment
              </Button>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default Comments;
