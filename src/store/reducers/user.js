import { handleActions } from 'redux-actions'

import {
  INITIAL_STATE,
  SET_PROFILE,
} from '@/store/types/user'

const initialState = {
  uid: '',
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
}

const reducer = handleActions({
  [INITIAL_STATE]: () => (
    { ...initialState }
  ),
  [SET_PROFILE]: (state, action) => {
    const { payload } = action

    if (payload) {
      return {
        ...state,
        ...payload,
      }
    }

    return { ...initialState }
  },
}, initialState)

export default reducer
