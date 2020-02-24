/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react'

import ReduxProvider from '@/store/index'

export const wrapRootElement = ({ element }) => {
  const ConnectedRootElement = (
    <ReduxProvider>
      {element}
    </ReduxProvider>
  )

  return ConnectedRootElement
}

export default {}

