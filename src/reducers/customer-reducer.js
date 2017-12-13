const defaultState = {
  customers: [],
  customer: {name:{}},
  loading: false,
  errors:{}
}

export default (state=defaultState, action={}) => {
  switch (action.type) {
    case 'FETCH_CUSTOMERS_FULFILLED': {
      return {
        ...state,
        customers: action.payload.data,
        loading: false,
        errors: {}
      }
    }

    case 'FETCH_CUSTOMERS_PENDING': {
      return {
        ...state,
        loading: true,
        errors: {}
      }
    }

    case 'FETCH_CUSTOMERS_REJECTED': {
      return {
        ...state,
        loading: false,
        errors: { global: action.payload.message }
      }
    }

    case 'NEW_CUSTOMER': {
      return {
        ...state,
        customer: {name:{}}
      }
    }

    case 'SAVE_CUSTOMER_PENDING': {
      return {
        ...state,
        loading: true
      }
    }

    case 'SAVE_CUSTOMER_FULFILLED': {
      return {
        ...state,
        customers: [...state.customers, action.payload.data],
        errors: {},
        loading: false
      }
    }

    case 'SAVE_CUSTOMER_REJECTED': {
      const data = action.payload.response.data;
      // convert feathers error formatting to match client-side error formatting
      const { "name.first":first, "name.last":last, phone, email } = data.errors;
      const errors = { global: data.message, name: { first,last }, phone, email };
      return {
        ...state,
        errors: errors,
        loading: false
      }
    }

    case 'FETCH_CUSTOMER_PENDING': {
      return {
        ...state,
        loading: true,
        customer: {name:{}}
      }
    }

    case 'FETCH_CUSTOMER_FULFILLED': {
      return {
        ...state,
        customer: action.payload.data,
        errors: {},
        loading: false
      }
    }

    case 'UPDATE_CUSTOMER_PENDING': {
      return {
        ...state,
        loading: true
      }
    }

    case 'UPDATE_CUSTOMER_FULFILLED': {
      const customer = action.payload.data;
      return {
        ...state,
        customers: state.customers.map(item => item.id === customer.id ? customer : item),
        errors: {},
        loading: false
      }
    }

    case 'UPDATE_CUSTOMER_REJECTED': {
      const data = action.payload.response.data;
      const { "name.first":first, "name.last":last, phone, email } = data.errors;
      const errors = { global: data.message, name: { first,last }, phone, email };
      return {
        ...state,
        errors: errors,
        loading: false
      }
    }

    case 'DELETE_CUSTOMER_FULFILLED': {
      const id = action.payload.data.id;
      return {
        ...state,
        customers: state.customers.filter(item => item.id !== id)
      }
    }

    default:
      return state;
  }
}
