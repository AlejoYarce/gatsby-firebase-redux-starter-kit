import { combineReducers } from 'redux'

import user from '@/store/reducers/user'
import ui from '@/store/reducers/ui'

export default combineReducers({
  user,
  ui,
})
