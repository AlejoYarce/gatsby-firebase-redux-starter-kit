import { handleActions } from 'redux-actions'

import {
  INITIAL_STATE,
  SET_FIREBASE_READY,
} from '@/store/types/ui'

const initialState = {
  isFirebaseReady: false,
  userExists: false,
}

const reducer = handleActions({
  [INITIAL_STATE]: () => (
    { ...initialState }
  ),
  [SET_FIREBASE_READY]: (state, action) => {
    return {
      ...state,
      isFirebaseReady: true,
      userExists: action.payload,
    }
  },
}, initialState)

export default reducer
