# Gatsby, Firebase and Redux Starter Kit
A Starter Kit based on Gatsby starter default, Gatsby Firebase Plugin, Redux and React Emotion. Have a quick way to check if Firebase App is ready and if a user exists.

[Gatsby Starter Default](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-default/)

[Gatsby Firebase Plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-firebase/)

[Redux](https://github.com/reduxjs/react-redux)

## Firebase
This Starter has a Firebase lib **(lib/firebase.js)** that exports a Hook that initialise the **onAuthStateChanged** event and stores *iFirebaseReady* and *userAuth* in Redux
```
export const useFirebaseHook = () => {
  useFirebase(firebaseApp => {
    firebase = firebaseApp

    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user && user.uid) {
        await onLogin(user.uid)
      } else {
        store.dispatch(setFirebaseReady(!!user))
        store.dispatch(setUserAuth(user))
      }
    })

    return function cleanup() {
      unsubscribe()
    }
  }, [])
}
```
This lib also can handle login and logout events inside the Firebase App.

### Using Firebase in Comps
Firebase plugin exports a React hook **useFirebase**. It uses the same API as React.useEffect, except for that in the first argument, the function has firebase as its parameter.
The idea is that to get Firebase to work in both client-side environment and SSR without any UX compromises, you have to take special care of the Firebase initialization. Thanks to React Hook, you can use useFirebase in a kinda-nice way. Without it, you’d have to constantly check whether firebase is initialized or not (if not, it's null).
```
import React from "react"
import { FirebaseContext } from "gatsby-plugin-firebase"

function MyComponent({ firebase }) {
  const firebase = React.useContext(FirebaseContext)
  const [user, setUser] = React.useState()

  React.useEffect(() => {
    if (!firebase) {
      return
    }
    
    firebase
      .database()
      .ref("/user")
      .once("value")
      .then(snapshot => {
        setUser(snapshot.val())
      })
  }, [firebase])

  return <p>Hello {user ? user.name : "there"}</p>
}

export default MyComponent
```

## 🚀 Quick start

1.  **Clone this repo.**

  ```sh
    git clone git@github.com:AlejoYarce/gatsby-firebase-redux-starter-kit.git
  ```

2. **Configure the env**

  Create `.env` file.

  ```shell
    cp .env.example .env
  ```

  Then set your Firebase variables
  ```
    GATSBY_FIREBASE_API_KEY
    GATSBY_FIREBASE_AUTH_DOMAIN
    GATSBY_FIREBASE_DATABASE_URL
    GATSBY_FIREBASE_PROJECT_ID
    GATSBY_FIREBASE_STORAGE_BUCKET
    GATSBY_FIREBASE_MESSAGING_SENDER_ID
    GATSBY_FIREBASE_APP_ID
    GATSBY_FIREBASE_MEASUREMENT_ID
  ```

3.  **Start developing**

    Navigate into your new site’s directory and start it up.

    ```sh
    cd gatsby-firebase-redux-starter-kit/
    yarn intall
    yarn start
    ```

4.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

    Open the `gatsby-firebase-redux-starter-kit` directory in your code editor of choice.
