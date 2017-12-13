import React, { Component} from 'react';
import { connect } from 'react-redux';
import CustomerList from '../components/customer-list';
import { fetchCustomers, deleteCustomer } from '../actions/customer-actions';

class CustomerListPage extends Component {

  componentDidMount() {
    this.props.fetchCustomers();
  }

  render() {
    return (
      <div>
        <h1>List of Customers</h1>
        <CustomerList customers={this.props.customers} loading={this.props.loading} errors={this.props.errors} deleteCustomer={this.props.deleteCustomer}/>
      </div>
    )
  }
}

// Make customers  array available in  props
function mapStateToProps(state) {
  return {
      customers : state.customerStore.customers,
      loading: state.customerStore.loading,
      errors: state.customerStore.errors
  }
}

export default connect(mapStateToProps, {fetchCustomers, deleteCustomer})(CustomerListPage);
