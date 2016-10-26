import ApiEndpoints from '../../helpers/ApiEndpoints.json';

const GET_MESSAGE = 'app/GET_MESSAGE';
const GET_MESSAGE_SUCCESS = 'app/GET_MESSAGE_SUCCESS';
const GET_MESSAGE_FAIL = 'app/GET_MESSAGE_FAIL';

const initialState = {
  locale: 'en',
  message: 'Hello World'
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_MESSAGE_SUCCESS:
      return Object.assign({}, state, { message: action.result.message });
    default:
      return state;
  }
}

export function getMessage() {
  return {
    types: [GET_MESSAGE, GET_MESSAGE_SUCCESS, GET_MESSAGE_FAIL],
    promise: (client) => client.get(ApiEndpoints.MESSAGE)
  };
}
