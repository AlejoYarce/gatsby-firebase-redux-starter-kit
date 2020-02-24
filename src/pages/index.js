import React from 'react'
import { Link } from 'gatsby'

import Layout from '@/components/layout'
// import Image from '@/components/image'
import SEO from '@/components/seo'
import Login from '@/components/auth/Login'

const IndexPage = () => {
  return (
  <Layout>
    <SEO title="Home" />

    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div> */}

    <Login />

    <br />
    <Link to="/events/">Go to page 2</Link>
  </Layout>
)}

export default IndexPage
