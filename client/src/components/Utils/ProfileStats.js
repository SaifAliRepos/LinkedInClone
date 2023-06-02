import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function ProfileStats() {
  return (
    <div>
      <Card className='rounded mx-3'>
        <div className='bg-dark rounded-top'>    <Card.Img
          className='img-fluid rounded-circle mx-auto d-block w-25 my-3'
          src='https://statinfer.com/wp-content/uploads/dummy-user.png'
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
      <Card className='mt-3 mx-3'>
        <Card.Img
          variant='top'
          src='https://assets.wpdeveloper.com/2022/01/903de8dc-why-do-a-content-writer-or-author-must-need-a-personal-website-how-to-create-one-without-coding.png'
        />
        <Card.Body>
          <Card.Text className='text-center'>
            Building your <strong>profile is key</strong> to success rate,
            Some quick example text to build on the card title and make up
            the bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProfileStats;
