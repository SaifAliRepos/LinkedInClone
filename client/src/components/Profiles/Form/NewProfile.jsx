import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { useProfile } from '../../../actions/profile';
import Accordion from 'react-bootstrap/Accordion';
import EducationForm from './Education';
import ExperienceForm from './Experience';
import Badge from 'react-bootstrap/Badge';

function NewProfile(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { createProfile } = useProfile();

  const [postData, setFormData] = useState({
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

  useEffect(() => {
    setFormData({
      company: props?.profile?.company || '',
      location: props?.profile?.location || '',
      bio: props?.profile?.bio || '',
      skills: props?.profile?.skills || '',
      status: props?.profile?.status || false,
      githubusername: props?.profile?.githubusername || '',
      youtube: props?.profile?.youtube || '',
      instagram: props?.profile?.instagram || '',
      twitter: props?.profile?.twitter || '',
      facebook: props?.profile?.facebook || '',
    });
  }, [props.profile]);

  const {
    company,
    location,
    bio,
    skills,
    status,
    githubusername,
    youtube,
    instagram,
    twitter,
    facebook,
  } = postData;

  const onChange = (e) => {
    setFormData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(skills);
    await createProfile({
      company,
      location,
      bio,
      skills,
      status,
      githubusername,
      youtube,
      instagram,
      twitter,
      facebook,
    });
    props.fetchData();
    setShow(false);
  };

  return (
    <div>
      <Button
        variant='dark'
        size='sm'
        className='px-2 mt-3'
        onClick={handleShow}
      >
        Edit Profile
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby='example-modal-sizes-title-lg'
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-modal-sizes-title-lg d-flex'>
            Complete your profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col className='p-5'>
                <Image
                  fluid
                  src='https://cdn.dribbble.com/users/176039/screenshots/3081690/tna-dribbble-01.gif'
                  alt='working man'
                  width={'300px'}
                />

                <Accordion className='mb-3'>
                  <Accordion.Item eventKey='0'>
                    <Accordion.Header>
                      <strong>Introduction</strong>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Form onSubmit={(e) => onSubmit(e)}>
                        <small className='mx-1'>{'Company'}</small>
                        <Form.Group className='mb-4' controlId='formName'>
                          <Form.Control
                            size='lg'
                            type='text'
                            placeholder='Enter Name of company'
                            name='company'
                            value={company}
                            onChange={(e) => onChange(e)}
                            required
                          />
                        </Form.Group>
                        <small className='mx-1'>{'Bio'}</small>
                        <Form.Group className='mb-4' controlId='formBio'>
                          <Form.Control
                            as='textarea'
                            rows='5'
                            placeholder='Enter your bio'
                            name='bio'
                            value={bio}
                            onChange={(e) => onChange(e)}
                            required
                          />
                        </Form.Group>
                        <small className='mx-1'>{'Location'}</small>
                        <Form.Group className='mb-4' controlId='formLocation'>
                          <Form.Control
                            size='lg'
                            type='text'
                            placeholder='Enter your location'
                            name='location'
                            value={location}
                            onChange={(e) => onChange(e)}
                            required
                          />
                        </Form.Group>
                        <small className='mx-1'>{'Skills'}</small>
                        <Form.Group className='mb-4' controlId='formSkills'>
                          <Form.Control
                            size='lg'
                            type='text'
                            placeholder='Enter skills with | separator '
                            name='skills'
                            value={skills}
                            onChange={(e) => onChange(e)}
                          />
                        </Form.Group>
                        <small className='mx-1'>{'Githun handle'}</small>
                        <Form.Group className='mb-4' controlId='formGit'>
                          <Form.Control
                            size='lg'
                            type='text'
                            placeholder='Enter your git handlle'
                            name='githubusername'
                            value={githubusername}
                            onChange={(e) => onChange(e)}
                          />
                        </Form.Group>
                        <small className='mx-1'>{'Youtube link'}</small>
                        <Form.Group className='mb-4' controlId='formT'>
                          <Form.Control
                            size='lg'
                            type='email'
                            placeholder='Enter your youtube profile link'
                            name='youtube'
                            value={youtube}
                            onChange={(e) => onChange(e)}
                          />
                        </Form.Group>
                        <small className='mx-1'>{'Instagram link'}</small>
                        <Form.Group className='mb-4' controlId='formT'>
                          <Form.Control
                            size='lg'
                            type='email'
                            placeholder='Enter your instagram profile link'
                            name='instagram'
                            value={instagram}
                            onChange={(e) => onChange(e)}
                          />
                        </Form.Group>
                        <small className='mx-1'>{'Twitter link'}</small>
                        <Form.Group className='mb-4' controlId='formT'>
                          <Form.Control
                            size='lg'
                            type='email'
                            placeholder='Enter your twitter profile link'
                            name='twitter'
                            value={twitter}
                            onChange={(e) => onChange(e)}
                          />
                        </Form.Group>
                        <small className='mx-1'>{'Facebook link'}</small>
                        <Form.Group className='mb-4' controlId='formT'>
                          <Form.Control
                            size='lg'
                            type='email'
                            placeholder='Enter your facebook profile link'
                            name='facebook'
                            value={facebook}
                            onChange={(e) => onChange(e)}
                          />
                        </Form.Group>
                        <Form.Check
                          type='switch'
                          id='custom-switch'
                          name='status'
                          label='Activate profile'
                          checked={status ? true : false}
                          onChange={(e) => {
                            setFormData({
                              ...postData,
                              [e.target.name]: e.target.checked,
                            });
                          }}
                        />

                        <Button
                          type='submit'
                          size='md px-4'
                          variant='success'
                          value='Register'
                          className='mt-3'
                        >
                          {props.actionBtn || 'Update Profile'}
                        </Button>
                      </Form>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey='1'>
                    <Accordion.Header>
                      <strong>Education</strong>
                    </Accordion.Header>
                    <Accordion.Body>
                      <EducationForm
                        education={props?.profile?.education}
                        fetchData={props.fetchData}
                        closeModal={handleClose}
                      />
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey='2'>
                    <Accordion.Header>
                      <strong>Experience</strong>
                    </Accordion.Header>
                    <Accordion.Body>
                      <ExperienceForm
                        experience={props?.profile?.experience}
                        fetchData={props.fetchData}
                      />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <hr />
                <p className='text-center'>
                  {' '}
                  <Badge bg='dark'>All at one place!</Badge>
                </p>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default NewProfile;
