import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Connect from '../../icons/connect';

const ConnectCard = (props) => {
  return (
    <div>
      <div className='rounded border'>
        <div className='bg-dark rounded-top py-5'> </div>
        <Card.Img
          className='img-fluid rounded-circle mx-auto d-block w-50 mt-neg-profile'
          src='https://statinfer.com/wp-content/uploads/dummy-user.png'
          alt='Profile picture'
        />
        <Card.Body>
          <Card.Title className='my-2'>
            <strong>{props.user.name}</strong>
          </Card.Title>
          <span className='text-secondary'>
            <small>
              <strong>
                {' '}
                Software Engineer at Devsinc | MERN | ROR | AWS | Shopify
              </strong>
            </small>
          </span>
        </Card.Body>
        <Card.Body>
          <Button
            size='sm'
            className='my-3'
            variant='outline-success px-5 rounded'
            onClick={() => props.handleSentRequest(props.user._id)}
            disabled={props.sentRequests.some(
              (usr) => usr.user === props.user?._id,
            )}
          >
            <Connect />
            {props.sentRequests.some((usr) => usr.user === props.user?._id)
              ? 'Requested'
              : 'Connect'}
          </Button>
        </Card.Body>
      </div>
    </div>
  );
};

export default ConnectCard;
