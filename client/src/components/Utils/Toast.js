import ToastFade from 'react-bootstrap/Toast';
import { useDispatch, useSelector } from 'react-redux'
import ToastContainer from 'react-bootstrap/ToastContainer';
import { REMOVE_ALERT } from '../../reducers/alertSlice';

function AutohideToast() {
  // let alert = useSelector((state) => state.alert.value);
  let alertText = useSelector((state) => state.alert.text);
  const dispatch = useDispatch();

  return (
    <ToastContainer position="top-end" className='m-2'>
      <ToastFade>
        <ToastFade onClose={() => { return dispatch(REMOVE_ALERT()) }} show={false} delay={5000} autohide>
          <ToastFade.Header className='bg-light'>
            <img src="https://png.pngtree.com/png-vector/20190507/ourmid/pngtree-vector-alert-icon-png-image_1025004.jpg" className="rounded me-2" width="25px" alt="" />
            <strong className="me-auto">Pointers for you</strong>
            <small>Have a good day :)</small>
          </ToastFade.Header>
          <ToastFade.Body><li>{alertText}</li></ToastFade.Body>
        </ToastFade>
      </ToastFade>
    </ToastContainer>
  );
}

export default AutohideToast;
