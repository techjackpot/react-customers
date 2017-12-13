import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import CustomerListPage from './pages/customer-list-page';
import CustomerFormPage from './pages/customer-form-page';

class App extends Component {
  render() {
    return (
      <Container>
        <div className="ui two item menu">
          <NavLink className="item" activeClassName="active" exact to="/">Customers List</NavLink>
          <NavLink className="item" activeClassName="active" exact to="/customers/new">Add Customer</NavLink>
        </div>
        <Route exact path="/" component={CustomerListPage}/>
        <Route path="/customers/new" component={CustomerFormPage}/>
        <Route path="/customers/edit/:id" component={CustomerFormPage}/>
      </Container>
    );
  }
}

export default App;
