import React, { Component} from 'react';
import { Redirect } from 'react-router';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { newCustomer, saveCustomer, fetchCustomer, updateCustomer } from '../actions/customer-actions';
import CustomerForm from '../components/customer-form';


class CustomerFormPage extends Component {

  state = {
    redirect: false
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;
    if(id){
      this.props.fetchCustomer(id)
    } else {
      this.props.newCustomer();
    }
  }

  submit = (customer) => {
    if(!customer.id) {
      return this.props.saveCustomer(customer)
        .then(response => this.setState({ redirect:true }))
        .catch(err => {
           throw new SubmissionError(this.props.errors)
         })
    } else {
      return this.props.updateCustomer(customer)
        .then(response => this.setState({ redirect:true }))
        .catch(err => {
           throw new SubmissionError(this.props.errors)
         })
    }
  }

  render() {
    return (
      <div>
        {
          this.state.redirect ?
          <Redirect to="/" /> :
          <CustomerForm customer={this.props.customer} loading={this.props.loading} onSubmit={this.submit} />
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    customer: state.customerStore.customer,
    errors: state.customerStore.errors
  }
}

export default connect(mapStateToProps, {newCustomer, saveCustomer, fetchCustomer, updateCustomer})(CustomerFormPage);
