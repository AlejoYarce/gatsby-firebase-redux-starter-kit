/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react'
import PropTypes from 'prop-types'

import ReduxProvider from '@/store/index'

export const wrapRootElement = ({ element }) => (
  <ReduxProvider>
    {element}
  </ReduxProvider>
)

wrapRootElement.propTypes = {
  element: PropTypes.shape().isRequired,
}

export default {}

