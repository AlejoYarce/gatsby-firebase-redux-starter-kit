import { createAction } from 'redux-actions'

import {
  SET_PROFILE,
} from '@/store/types/user'

// Dispatch Actions
const setUserAuthAct = createAction(SET_PROFILE)
export const setUserAuth = data => (dispatch) => {
  dispatch(setUserAuthAct(data))
}
