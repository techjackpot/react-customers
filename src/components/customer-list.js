import React from 'react';
import { Card, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CustomerCard from './customer-card';

export default function CustomerList({customers, loading, errors, deleteCustomer}){

  const loadingMessage = (
      <Message icon info>
        <Icon name='circle notched' loading />
        <Message.Content>
           <Message.Header>Just one second</Message.Header>
           We are fetching that content for you.
       </Message.Content>
      </Message>
    )

    const emptyMessage = (
      <Message icon info>
        <Icon name='warning circle' />
        <Message.Content>
           <Message.Header>No Customers Found</Message.Header>
           <p>Add some new customers to get started.</p>
           <Link to={'/customers/new'} className="ui button primary">Add New Customer</Link>
       </Message.Content>
      </Message>
    )

    const timeoutMessage = (
      <Message icon negative>
        <Icon name='wait' />
        <Message.Content>
           <Message.Header>{errors.global}</Message.Header>
           Is the backend server running?
       </Message.Content>
      </Message>
    )

  const cards = () => {
    return customers.map(customer => {
      return (
        <CustomerCard key={customer.id} customer={customer} deleteCustomer={deleteCustomer} />
      )
    })
  }

  const customerList = (
    <Card.Group>
      { cards() }
    </Card.Group>
  )

  return (
    <div>
      { loading && loadingMessage }
      { customers.length === 0 && !loading  && !errors.global && emptyMessage }
      { errors.global && timeoutMessage }
      { customers.length > 0 && customerList }
    </div>
  )
}
