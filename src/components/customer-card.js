import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default function CustomerCard({customer, deleteCustomer}) {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Icon name='user outline'/> {customer.name.first} {customer.name.last}
        </Card.Header>
        <Card.Description>
          <p><Icon name='phone'/> {customer.phone}</p>
          <p><Icon name='mail outline'/> {customer.email}</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Link to={`/customers/edit/${customer.id}`} className="ui basic button green">Edit</Link>
          <Button basic color="red" onClick={() => deleteCustomer(customer.id)} >Delete</Button>
        </div>
      </Card.Content>
    </Card>
  )
}

CustomerCard.propTypes = {
  customer: React.PropTypes.object.isRequired
}
