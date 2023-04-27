import React, { Fragment, useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { useProfile } from '../../actions/profile';
import Image from 'react-bootstrap/Image';
import Instagram from '../../icons/instagram';
import Youtube from '../../icons/youtube';
import Git from '../../icons/github';
import Facebook from '../../icons/facebook';
import { Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ProfilesList from './ProfilesList';
import { convertDate } from '../Utils/covertDate';
import Shop from '../../icons/shop';
import Work from '../../icons/work';
import NewProfile from './Form/NewProfile';
import { useSelector } from 'react-redux';
import { usePost } from '../../actions/posts';

function ViewProfile(props) {
  const { user_id } = useParams();
  const activeUserId = useSelector((state) => state.auth.user?._id);

  const { getProfile, getProfiles } = useProfile();
  const { getUserPosts } = usePost();

  const [userPosts, setUserPosts] = useState();
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState({
    company: '',
    location: '',
    bio: '',
    skills: '',
    status: false,
    githubusername: '',
    youtube: '',
    instagram: '',
    twitter: '',
    facebook: '',
  });

  const fetchData = async () => {
    try {
      const res = await getProfile(user_id);
      setProfile(res);

      const fetchedrofiles = await getProfiles();
      setProfiles(fetchedrofiles.profiles);

      let fetchedPosts = await getUserPosts(user_id);
      setUserPosts(fetchedPosts?.articles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('fired in view profile');
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);

  return (
    <div className='bg-gray'>
      <Container className='px-5'>
        <Row>
          <Col md={9} className='border rounded p-0 shadow my-5'>
            <Fragment>
              <div className='bg-white rounded'>
                <Row className='mx-auto border'>
                  <div className='bg-profile mb-5 rounded-top'>
                    <div className='rounded position-relative '>
                      <Image
                        fluid
                        className='rounded-circle d-block position-absolute mx-3 mt-4'
                        src='https://media.licdn.com/dms/image/D5603AQE3fFjSR3noNg/profile-displayphoto-shrink_800_800/0/1668849247496?e=1684972800&v=beta&t=JM39gXHjeY1avI30KPP8dOcmhDFgfzzxXdphNfEIH2A'
                        alt='Profile picture'
                        width={'150px'}
                      />
                    </div>
                  </div>
                  <Col>
                    <div className='p-3'>
                      <div className='mt-4'>
                        <strong style={{ fontSize: '25px' }}>
                          {profile?.user?.name}{' '}
                        </strong>
                        <small>
                          <Badge bg='success'>Active</Badge>{' '}
                        </small>
                        <strong className='text-secondary d-flex'>
                          {profile?.skills}
                        </strong>
                      </div>
                      <small className='d-flex text-secondary'>
                        {profile?.location}
                      </small>
                      <strong className='text-primary d-flex mb-2'>
                        100+ connections
                      </strong>

                      <strong>Air University</strong>
                      <strong className='d-flex'>{profile?.company}</strong>
                      {activeUserId === profile?.user?._id && (
                        <NewProfile profile={profile} fetchData={fetchData} />
                      )}
                    </div>
                  </Col>
                  <Col className='offset-5 mt-5'>
                    <br />
                    <strong className='mx-2'>
                      <Badge className='mb-2' bg='secondary'>
                        Connect on
                      </Badge>{' '}
                    </strong>
                    <br />
                    <Youtube />
                    <a href='kabdkb'>youtube.com</a>
                    <br />
                    <Instagram />
                    <a href='kabdkb'>instagram.com</a>
                    <br />
                    <Git />
                    <a href='kabdkb'>github.com</a>
                    <br />
                    <Facebook />
                    <a href='kabdkb'>facebook.com</a>
                  </Col>{' '}
                </Row>
              </div>
            </Fragment>

            <Fragment>
              <div className='mt-2 bg-white border p-3 rounded'>
                <h4>
                  <strong>About</strong>
                </h4>
                <p>{profile?.bio}</p>
              </div>
              <div className='mt-2 border bg-white p-3 rounded'>
                <h4 className='mb-3'>
                  <strong>Skills</strong>
                </h4>
                {profile?.skills?.split('|').map((skill) => (
                  <strong
                    key={skill}
                    className='bg-success text-white rounded p-1 mx-1'
                  >
                    {skill}
                  </strong>
                ))}
              </div>
              <div className='mt-2 border bg-white p-3 rounded'>
                <h4 className='my-3'>
                  <strong>Education</strong>
                </h4>
                {profile?.education && profile?.education.length > 0 ? (
                  <ul className='StepProgress'>
                    <li className='StepProgress-item is-done'>
                      {profile?.education?.map((edu) => (
                        <div key={edu._id}>
                          <span className='StepProgress-item is-done'>
                            <strong>
                              <Shop />
                              {edu.name}
                            </strong>
                            <div className='mb-5 mx-4'>
                              <strong className='text-secondary'>
                                {edu.degree}
                              </strong>
                              <small className='d-flex mb-2'>
                                <Badge bg='secondary'>{edu.location}</Badge>{' '}
                              </small>

                              <small className='mb-2'>
                                From: {convertDate(edu.from)}
                              </small>
                              <small className='d-flex'>
                                To: {convertDate(edu.to)}
                              </small>
                            </div>
                          </span>
                        </div>
                      ))}
                    </li>
                    <li className='StepProgress-item current'></li>
                  </ul>
                ) : (
                  <p>Edit profile to add your education</p>
                )}
              </div>
              <div className='mt-2 border bg-white p-3 rounded'>
                <h4 className='mb-3'>
                  <strong>Experience</strong>
                </h4>
                {profile?.experience && profile.experience.length > 0 ? (
                  <ul className='StepProgress'>
                    <li className='StepProgress-item is-done'>
                      {profile?.experience?.map((exp) => (
                        <div key={exp._id}>
                          <span className='StepProgress-item is-done'>
                            <div className='mb-5'>
                              <strong>
                                <Work />
                                {exp.title}
                              </strong>
                              <div className='mb-5 mx-4'>
                                <small className='text-secondary'>
                                  <Badge bg='secondary'>{exp?.location}</Badge>{' '}
                                </small>
                                <small className='d-flex mb-2'>
                                  {exp?.description}
                                </small>

                                <small className='mb-2'>
                                  From: {convertDate(exp.from)}
                                </small>
                                <small className='d-flex'>
                                  To: {convertDate(exp.to)}
                                </small>
                              </div>
                            </div>
                          </span>
                        </div>
                      ))}
                    </li>
                    <li className='StepProgress-item current'></li>
                  </ul>
                ) : (
                  <p>Edit profile to add your experiences</p>
                )}
              </div>
              <Link
                className='text-decoration-none text-dark'
                to={`/profile/user/${profile?.user?._id}/recent_activity`}
              >
                <h5 className='underline my-3 text-center'>
                  <strong>
                    View recent activity of {profile?.user?.name} {'->'}
                  </strong>
                </h5>
              </Link>
            </Fragment>
          </Col>
          <Col className='text-center my-5'>
            <Card>
              <Card.Img
                variant='top'
                src='https://notamartwork.com/wp-content/uploads/2022/02/11-jobs-for-disabled-people-at-home-min.webp'
              />
              <Card.Body>
                <Card.Text className='text-center'>
                  Building your profile is key to <strong>success rate</strong>,
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className='mt-3'>
              <Card.Body>
                <Card.Title>
                  <strong>People you might know</strong>
                </Card.Title>

                <ProfilesList profiles={profiles} shortcut={true} />
              </Card.Body>
            </Card>
            <Card className='mt-3'>
              <Card.Img
                variant='top'
                src='https://media.licdn.com/dms/image/C4D22AQHSqXQEEHBLoA/feedshare-shrink_800/0/1673938544894?e=1682553600&v=beta&t=h-0NgaFgIF9So3IclZuwd2EodcHdjVhCjsJg61UjCNs'
              />
              <Card.Body>
                <Card.Text className='text-center'>
                  Building your <strong>profile is key</strong> to success rate,
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  ); // add else condition here is profile is undefined then pass active user props create profile
}

export default ViewProfile;
