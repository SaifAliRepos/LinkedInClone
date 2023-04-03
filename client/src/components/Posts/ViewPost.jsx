import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NewPost from './NewPost';

export default function ViewPost(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant='outline-dark'
        size='sm'
        className='px-3'
        onClick={handleShow}
      >
        View
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>Edit Post</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <NewPost
            actionBtn='Update'
            data={props.data}
            closeModal={handleClose}
            fetchData={props.fetchData}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
