import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useProfile } from '../../../actions/profile';
import Backward from '../../../icons/backward';
import Forward from '../../../icons/forward';
import { convertDate } from '../../Utils/covertDate';

function EducationForm(props) {
  const { addEducation, removeEducation } = useProfile();
  const [eduLevel, setEduLevel] = useState(0);

  const [eduData, setEduData] = useState({
    name: '',
    degree: '',
    eduLocation: '',
    from: '',
    to: '',
  });

  useEffect(() => {
    setEduData({
      name: props?.education[eduLevel]?.name || '',
      degree: props?.education[eduLevel]?.degree || '',
      location: props?.education[eduLevel]?.location || '',
      from: props?.education[eduLevel]?.from || '',
      to: props?.education[eduLevel]?.to || '',
    });
  }, [props?.education, eduLevel]);

  const { name, degree, location, from, to } = eduData;

  const onChange = (e) => {
    setEduData({
      ...eduData,
      [e.target.name]: e.target.value,
    });
  };

  const nextEduLevel = () => {
    console.log(props?.education?.length);
    if (eduLevel < props?.education?.length) {
      setEduLevel(eduLevel + 1);
    }
  };

  const prevEduLevel = () => {
    if (eduLevel > 0) {
      setEduLevel(eduLevel - 1);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(eduData);
    //we need to handle update education as well
    await addEducation({ name, degree, location, from, to });
    props.fetchData();
    props.closeModal();
  };

  const deleteEducation = async (eduId) => {
    await removeEducation(eduId);
    props.fetchData();
    props.closeModal();
  };

  return (
    <div>
      <Form onSubmit={(e) => onSubmit(e)}>
        <div className='text-center'>
          <Button variant='light' className='mt-3 m-2' onClick={prevEduLevel}>
            <span>
              <Backward />
              {' Prev'}
            </span>
          </Button>
          <Button variant='light' className='mt-3 m-2' onClick={nextEduLevel}>
            <span>
              {'Next  '}
              <Forward />
            </span>
          </Button>
        </div>

        <small className='mx-1'>{'Name of institute'}</small>
        <Form.Group className='mb-4' controlId='formName'>
          <Form.Control
            size='lg'
            type='text'
            placeholder='Enter Name of institute'
            name='name'
            value={name || ''}
            onChange={(e) => onChange(e)}
            required
          />
        </Form.Group>
        <small className='mx-1'>{'Degree'}</small>
        <Form.Group className='mb-4' controlId='formName'>
          <Form.Control
            as='textarea'
            rows='5'
            placeholder='Enter your degree'
            name='degree'
            value={degree || ''}
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
            from={from ? convertDate(from) : ''}
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

        <Button type='submit' size='sm px-4' variant='success' value='Register'>
          {eduLevel > props?.education?.length - 1
            ? 'Add Education'
            : 'Update Education'}
        </Button>
        <Button
          variant='danger'
          size='sm'
          onClick={() => deleteEducation(props?.education._id)}
          className='mx-2'
        >
          {'Remove Education'}
        </Button>
      </Form>
    </div>
  );
}

export default EducationForm;
