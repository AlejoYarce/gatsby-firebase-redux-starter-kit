import React from 'react'
import { Provider } from 'react-redux'
import { createStore as reduxCreateStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import PropTypes from 'prop-types'

import reducer from '@/store/reducers'

const appMiddleware = applyMiddleware(thunk)
const middleWare = process.env.NODE_ENV !== 'production' ? composeWithDevTools(appMiddleware) : compose(appMiddleware)
const createStore = () => reduxCreateStore(reducer, middleWare)
export const store = createStore()

const ReduxProvider = (props) => {
  if (props && props.children) {
    const { children } = props
    return <Provider store={store}>{children}</Provider>
  }

  return null
}

ReduxProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default ReduxProvider
