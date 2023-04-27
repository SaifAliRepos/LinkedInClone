import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

function ProfileListItem({ profile }) {
  return (
    <li key={profile._id}>
      <div className='d-flex align-items-center'>
        <Image
          width={'80px'}
          className='rounded-circle border'
          src='https://statinfer.com/wp-content/uploads/dummy-user.png'
          alt='Profile picture'
        />
        <div className='d-inline-block bg-white px-3 py-1 rounded'>
          <Link
            className='text-decoration-none text-dark'
            to={`/profile/user/${profile.user._id}`}
          >
            <h5 className='underline'>
              <strong>{profile.user.name}</strong>
            </h5>
          </Link>

          <strong>
            <small>{profile?.skills}</small>
            <br />
            <small className='text-secondary'>{profile.location}</small>
          </strong>
        </div>
      </div>
      <hr className='offset-1' />
    </li>
  );
}

function ProfilesList({ profiles, shortcut }) {
  return (
    <div className='my-3'>
      {profiles.length ? (
        <ul className='list-unstyled'>
          {shortcut
            ? profiles.slice(0, 3).map((profile) => (
                <ProfileListItem key={profile._id} profile={profile} /> //for this case we should pass sugessted users
              ))
            : profiles.map((profile) => (
                <ProfileListItem key={profile._id} profile={profile} /> //for this case we should pass connected users
              ))}
        </ul>
      ) : (
        <p>No profiles found</p>
      )}
    </div>
  );
}

export default ProfilesList;
