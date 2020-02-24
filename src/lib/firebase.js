import { useFirebase } from 'gatsby-plugin-firebase'

import { store } from '@/store/index'

import {
  setUserAuth,
} from '@/store/actions/user'
import {
  setFirebaseReady,
} from '@/store/actions/ui'

let firebase = {}

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

export const onLogin = async (uid) => {
  const profileDoc = firebase
    .firestore()
    .collection('profile')
    .doc(uid)

  const userData = await profileDoc.get()

  store.dispatch(setUserAuth({
    uid,
    ...userData.data(),
  }))
  store.dispatch(setFirebaseReady(!!uid))
}

export const doLoginWithUserPass = async (email, pass) => {
  await firebase.auth().signInWithEmailAndPassword(email, pass)
    .catch((error) => {
      var errorCode = error.code
      var errorMessage = error.message
      console.error('[loginWithUserPass] - error', errorCode, errorMessage)
    })
}

export const doLoginWithGoogle = async () => { }

export const doLogOut = async () => {
  await firebase.auth().signOut()
    .catch((error) => {
      var errorCode = error.code
      var errorMessage = error.message
      console.error('[logOut] - error', errorCode, errorMessage)
    })
}

export default {}
