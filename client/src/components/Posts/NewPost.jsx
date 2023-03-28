import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import { usePost } from '../../actions/posts';

function NewPost(props) {
  const { createPost, updatePost } = usePost();

  const [postData, setFormData] = useState({
    title: props?.data?.title || '',
    description: props?.data?.description || '',
  });

  const { title, description } = postData;
  const postId = props?.data?._id || '';

  const onChange = (e) =>
    setFormData({
      ...postData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (props.actionBtn === 'Update') {
      await updatePost({ title, description }, postId);

      props.fetchData();
      props.closeModal();
    }

    if (props.actionBtn === 'Post') {
      await createPost({ title, description });
      props.fetchData();
    }
  };

  return (
    <div>
      <Container>
        <Form onSubmit={(e) => onSubmit(e)}>
          <Form.Group className='mb-4' controlId='formTitle'>
            <Form.Control
              size='lg'
              type='text'
              placeholder='Enter title'
              name='title'
              value={title}
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-4' controlId='formDescription'>
            <Form.Control
              as='textarea'
              rows='5'
              placeholder='Enter description'
              name='description'
              value={description}
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>

          <Button
            type='submit'
            size='md px-5'
            variant='success'
            value='Register'
          >
            {props.actionBtn}
          </Button>
          <hr />
          <p>Acheiving greateness together.</p>
        </Form>
      </Container>
    </div>
  );
}

export default NewPost;
