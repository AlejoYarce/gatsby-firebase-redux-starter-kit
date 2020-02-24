import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useFirebase } from 'gatsby-plugin-firebase'
import { Link } from 'gatsby'
import { get } from 'lodash'
import moment from 'moment'

import Layout from '@/components/layout'
import SEO from '@/components/seo'

const SecondPage = (props) => {
  const {
    userUID,
  } = props

  /* Holy Grail */
  useFirebase(firebase => {
    if (firebase && userUID) {
      getUpcomingEvents(firebase)
    }
  }, [userUID])

  const [upcomingEvents, setUpcomingEvents] = useState([])
  const getUpcomingEvents = async (firebase) => {
    const upcomingEventsDoc = firebase
      .firestore()
      .collection('upcomingEvents')
      .doc(userUID)

    const eventsData = await upcomingEventsDoc.get()
    const { events } = eventsData.data()
    setUpcomingEvents(events)
  }

  return (
    <Layout>
      <SEO title="Upcoming Events" />
      <h1>Upcoming Events</h1>
      <div>
        {
          upcomingEvents.map((event, idx) => (
            <div key={idx}>
              <h2>{event.name}</h2>
              <p>{event.date ? moment(event.date).format('LLLL') : ''}</p>
            </div>
          ))
        }
      </div>

      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

const mapStateToProps = state => ({
  userUID: get(state, 'user.uid', ''),
})

export default connect(mapStateToProps)(SecondPage)
