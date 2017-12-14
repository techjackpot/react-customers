import React, { Component } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';

const validate = (values) => {
  const errors = {name:{}};
  if(!values.name || !values.name.first) {
    errors.name.first = {
      message: 'You need to provide First Name'
    }
  }
  if(!values.phone) {
    errors.phone = {
      message: 'You need to provide a Phone number'
    }
  } else if(!/^(?:[0-9] ?){6,14}[0-9]$/.test(values.phone)) {
    errors.phone = {
      message: 'Phone number must be in International format'
    }
  }
  if(!values.email) {
    errors.email = {
      message: 'You need to provide an Email address'
    }
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = {
      message: 'Invalid email address'
    }
  }
  if(!values.address) {
    errors.address = {
      message: 'You need to provide Address'
    }
  }
  if(!values.street) {
    errors.street = {
      message: 'You need to provide Street'
    }
  }
  if(!values.city) {
    errors.city = {
      message: 'You need to provide City'
    }
  }
  if(!values.state) {
    errors.state = {
      message: 'You need to provide State'
    }
  }
  if(!values.zip) {
    errors.zip = {
      message: 'You need to provide ZipCode'
    }
  }
  return errors;
}

class CustomerForm extends Component {

  componentWillReceiveProps = (nextProps) => { // Load Customer Asynchronously
    const { customer } = nextProps;
    if(customer.id !== this.props.customer.id) { // Initialize form only once
      this.props.initialize(customer)
    }
  }

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <Form.Field className={classnames({error:touched && error})}>
      <label>{label}</label>
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span className="error">{error.message}</span>}
    </Form.Field>
  )

  render() {
    const { handleSubmit, pristine, submitting, loading, customer } = this.props;
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <h1 style={{marginTop:"1em"}}>{customer.id ? 'Edit Customer' : 'Add New Customer'}</h1>
          <Form onSubmit={handleSubmit} loading={loading}>
            <Form.Group widths='equal'>
              <Field name="name.first" type="text" component={this.renderField} label="First Name"/>
              <Field name="name.last" type="text" component={this.renderField} label="Last Name"/>
            </Form.Group>
            <Field name="email" type="text" component={this.renderField} label="Email"/>
            <Field name="phone" type="text" component={this.renderField} label="Phone"/>
            <Field name="address" type="text" component={this.renderField} label="Address"/>
            <Form.Group widths='equal'>
              <Field name="street" type="text" component={this.renderField} label="Street"/>
              <Field name="city" type="text" component={this.renderField} label="City"/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Field name="state" type="text" component={this.renderField} label="State"/>
              <Field name="zip" type="text" component={this.renderField} label="Zip"/>
            </Form.Group>
            <Button primary type='submit' disabled={pristine || submitting}>Save</Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default reduxForm({form: 'customer', validate})(CustomerForm);
