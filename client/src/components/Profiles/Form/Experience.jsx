import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useProfile } from '../../../actions/profile';
import Backward from '../../../icons/backward';
import Forward from '../../../icons/forward';
import { convertDate } from '../../Utils/covertDate';

function ExperienceForm(props) {
  const { addExperience, removeExperience } = useProfile();
  const [expLevel, setExpLevel] = useState(0);

  const [expData, setExpData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
  });

  useEffect(() => {
    setExpData({
      title: props?.experience[expLevel]?.title || '',
      company: props?.experience[expLevel]?.company || '',
      location: props?.experience[expLevel]?.location || '',
      from: props?.experience[expLevel]?.from || '',
      to: props?.experience[expLevel]?.to || '',
    });
  }, [props?.experience, expLevel]);

  const { title, company, location, from, to } = expData;

  const onChange = (e) => {
    setExpData({
      ...expData,
      [e.target.name]: e.target.value,
    });
  };

  const nextExpLevel = () => {
    console.log(props?.education?.length);
    if (expLevel < props?.education?.length) {
      setExpLevel(expLevel + 1);
    }
  };

  const prevExpLevel = () => {
    if (expLevel > 0) {
      setExpLevel(expLevel - 1);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await addExperience({
      title,
      company,
      location,
      from,
      to,
    });
    props.fetchData();
    props.closeModal();
  };

  const deleteExperience = async (eduId) => {
    await removeExperience(eduId);
    props.fetchData();
    props.closeModal();
  };

  return (
    <div>
      <Form onSubmit={(e) => onSubmit(e)}>
        <div className='text-center'>
          <Button variant='light' className='mt-3 m-2' onClick={prevExpLevel}>
            <span>
              <Backward />
              {' Prev'}
            </span>
          </Button>
          <Button variant='light' className='mt-3 m-2' onClick={nextExpLevel}>
            <span>
              {'Next  '}
              <Forward />
            </span>
          </Button>
        </div>

        <small className='mx-1'>{'Name of institute'}</small>
        <Form.Group className='mb-4'>
          <Form.Control
            size='lg'
            type='text'
            placeholder='Enter Name of institute'
            name='title'
            value={title || ''}
            onChange={(e) => onChange(e)}
            required
          />
        </Form.Group>
        <small className='mx-1'>{'Degree'}</small>
        <Form.Group className='mb-4'>
          <Form.Control
            as='textarea'
            rows='5'
            placeholder='Enter your degree'
            name='company'
            value={company || ''}
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
            value={location || ''}
            onChange={(e) => onChange(e)}
            required
          />
        </Form.Group>
        <small className='mx-1'>{'Starting Date'}</small>
        <Form.Group className='mb-4' controlId='formFrom'>
          <Form.Control
            size='lg'
            type='date'
            placeholder='Enter skills with | separator '
            name='from'
            value={from ? convertDate(from) : ''}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
        <small className='mx-1'>{'Ending Date'}</small>
        <Form.Group className='mb-4' controlId='formTo'>
          <Form.Control
            size='lg'
            type='date'
            placeholder='Enter skills with | separator '
            name='to'
            value={to ? convertDate(to) : ''}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        <Button
          type='submit'
          size='md px-4'
          variant='success'
          value='Register'
          className='mt-1'
        >
          {expLevel > props?.experience?.length - 1
            ? 'Add Experience'
            : 'Update Experience'}
        </Button>
        <Button
          variant='danger'
          size='sm'
          onClick={() => deleteExperience(props?.experience._id)}
          className='mx-2'
        >
          {'Remove Education'}
        </Button>
      </Form>
    </div>
  );
}

export default ExperienceForm;
