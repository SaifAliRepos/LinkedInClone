import React from 'react';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';

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
        <div className='d-inline-block mx-3 bg-white px-3 py-1 rounded'>
          <Link
            className='text-decoration-none text-dark'
            to={`/profiles/user/${profile.user._id}`}
          >
            <h5 className='underline'>
              <strong>{profile.user.name}</strong>
            </h5>
          </Link>
          <strong>
            <small>{profile.skills}</small>
          </strong>
          <small className='d-flex'>{profile.location}</small>
        </div>
      </div>
      <hr className='offset-1' />
    </li>
  );
}

function ProfilesList({ profiles, shortcut }) {
  return (
    <div className='my-3'>
      <h3 className='p-3'>
        {profiles.length} {profiles.length > 1 ? 'Profiles' : 'Profile'}
      </h3>
      {profiles.length ? (
        <ul className='list-unstyled'>
          {shortcut
            ? profiles
                .slice(0, 5)
                .map((profile) => (
                  <ProfileListItem key={profile._id} profile={profile} />
                ))
            : profiles.map((profile) => (
                <ProfileListItem key={profile._id} profile={profile} />
              ))}
        </ul>
      ) : (
        <p>No profiles found</p>
      )}
    </div>
  );
}

export default ProfilesList;
