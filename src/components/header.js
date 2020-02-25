import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from '@emotion/styled'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { css } from '@emotion/core'

const HeaderContainer = styled.header`
  background-color: rebeccapurple;
  margin-bottom: 1.45rem;
  height: 110px;
`
const Container = styled.div`
  margin: 0px auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`
const mainLink = css`
  color: white;
  text-decoration: none;
`
const link = css`
  color: white;
`

const Header = ({ siteTitle, userUID }) => (
  <HeaderContainer>
    <Container>
      <h1 style={{ margin: 0 }}>
        <Link to="/" css={mainLink}>
          {siteTitle}
        </Link>
      </h1>
      {
        userUID
          ? (
            <h5 style={{ margin: 0, textAlign: 'center', marginTop: 10 }}>
              <Link to="/events/" css={link}>Events</Link>
            </h5>
          )
          : null
      }
    </Container>
  </HeaderContainer>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

const mapStateToProps = state => ({
  userUID: get(state, 'user.uid', ''),
})

export default connect(mapStateToProps)(Header)
