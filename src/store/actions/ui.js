import { createAction } from 'redux-actions'

import {
  SET_FIREBASE_READY,
} from '@/store/types/ui'

// Dispatch Actions
const setFirebaseReadyAct = createAction(SET_FIREBASE_READY)
export const setFirebaseReady = data => (dispatch) => {
  dispatch(setFirebaseReadyAct(data))
}

