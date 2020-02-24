import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import styled from '@emotion/styled'

import { doLoginWithUserPass, doLogOut } from '@/lib/firebase'

const Container = styled.div`
  text-align: center;
`

const Button = styled.button`
  font-family: monospace, monospace;
  padding: 15px;
  width: 190px;
  height: 58px;
  background-color: rebeccapurple;
  font-size: 24px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  display: block;
  margin: 0 auto;

  &:hover {
    background-color: #7a3cb9;
  }
`

const Login = (props) => {
  const {
    userUID,
    userProfile,
    isFirebaseReady
  } = props

  const [showLoading, setShowLoading] = useState(true)
  useEffect(() => {
    if (userUID || (isFirebaseReady && !userUID)) {
      setShowLoading(false)
    } else {
      setShowLoading(true)
    }
  }, [userUID, isFirebaseReady])

  const logIn = async () => {
    const email = 'aa@aa.aa'
    const pass = '123456'
    setShowLoading(true)
    await doLoginWithUserPass(email, pass)
  }

  const logOut = async () => {
    await doLogOut()
  }

  const handleClick = () => userUID ? logOut() : logIn()

  const getLabel = () => {
    if (showLoading) {
      return 'Loading...'
    }

    return userUID && !showLoading ? 'Log Out' : 'Log In'
  }

  return (
    <div>
      <Container>
        {
          userUID
            ? (
              <div>
                Name: {userProfile.firstName} {userProfile.lastName}
                <br />
                Email: {userProfile.email}
                <br />
              </div>
            )
            : null
        }
      </Container>
      <Button onClick={handleClick}>
        {
          isFirebaseReady
            ? getLabel()
            : 'Loading...'
        }
      </Button>
    </div>
  )
}

const mapStateToProps = state => ({
  userUID: get(state, 'user.uid', ''),
  userProfile: get(state, 'user', {}),
  isFirebaseReady: get(state, 'ui.isFirebaseReady', false),
})

export default connect(mapStateToProps)(React.memo(Login))
