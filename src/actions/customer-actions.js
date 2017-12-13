import { client } from './';

const url = '/customers';

export function fetchCustomers(){
  return dispatch => {
    dispatch({
      type: 'FETCH_CUSTOMERS',
      payload: client.get(url)
    })
  }
}

export function newCustomer() {
  return dispatch => {
    dispatch({
      type: 'NEW_CUSTOMER'
    })
  }
}

export function saveCustomer(customer) {
  return dispatch => {
    return dispatch({
      type: 'SAVE_CUSTOMER',
      payload: client.post(url, customer)
    })
  }
}

export function fetchCustomer(id) {
  return dispatch => {
    return dispatch({
      type: 'FETCH_CUSTOMER',
      payload: client.get(`${url}/${id}`)
    })
  }
}

export function updateCustomer(customer) {
  return dispatch => {
    return dispatch({
      type: 'UPDATE_CUSTOMER',
      payload: client.put(`${url}/${customer.id}`, customer)
    })
  }
}

export function deleteCustomer(id) {
  return dispatch => {
    return dispatch({
      type: 'DELETE_CUSTOMER',
      payload: client.delete(`${url}/${id}`)
    })
  }
}
