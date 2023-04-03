import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import { usePost } from '../../actions/posts';
import Badge from 'react-bootstrap/Badge';

function NewPost(props) {
  const { createPost, updatePost } = usePost();
  const [img, setImg] = useState('');

  const [postData, setFormData] = useState({
    title: props?.data?.title || '',
    description: props?.data?.description || '',
    img: props?.data?.img || '',
  });

  const { title, description } = postData;
  const postId = props?.data?._id || '';

  const onChange = (e) =>
    setFormData({
      ...postData,
      [e.target.name]: e.target.value,
    });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      if (dataUrl) {
        // Check the size of the dataUrl before setting the img state
        const maxImgSize = 3 * 1024 * 1024; // 5MB max size
        if (dataUrl.length <= maxImgSize) {
          setImg(dataUrl);
        } else {
          // Handle error for dataUrl that exceeds the max size
          console.error('The selected file is too large.');
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (props.actionBtn === 'Update') {
      await updatePost({ title, description }, postId);

      props.fetchData();
      props.closeModal();
    }

    if (props.actionBtn === 'Post') {
      await createPost({ title, description, img });
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
          <Form.Group className='mb-4' controlId='formTitle'>
            <Form.Control
              size='sm'
              type='file'
              name='image'
              onChange={handleFileChange}
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
          <p>
            {' '}
            <Badge bg='secondary'>Converting dreams into reality.</Badge>
          </p>
        </Form>
      </Container>
    </div>
  );
}

export default NewPost;
