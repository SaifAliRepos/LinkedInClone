import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function KitchenSinkExample() {
  return (
    <div className='mx-4'>
      <Card>
        <div className='bg-light rounded'>    <Card.Img
          className='img-fluid rounded-circle mx-auto d-block w-50 my-3'
          src='https://media.licdn.com/dms/image/D5603AQE3fFjSR3noNg/profile-displayphoto-shrink_800_800/0/1668849247496?e=1684972800&v=beta&t=JM39gXHjeY1avI30KPP8dOcmhDFgfzzxXdphNfEIH2A'
          alt='Profile picture'
        /></div>

        <Card.Body>
          <Card.Title><strong>Saif Ali</strong></Card.Title>
          <span><strong><small>Software Engineer at Devsinc | MERN | ROR | AWS | Shopify | .Net</small></strong></span>
        </Card.Body>
        <ListGroup className="list-group-flush text-left">
          <ListGroup.Item>Likes on profile <strong className='text-primary'>40</strong></ListGroup.Item>
          <ListGroup.Item>Connections <strong className='text-success'>100</strong></ListGroup.Item>
          <ListGroup.Item>Try <strong className='text-warning'>premimum</strong></ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>

    </div>
  );
}

export default KitchenSinkExample;
