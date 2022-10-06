import { initializeApp } from 'firebase/app'
import {
  projectId,
  apiKey,
  databaseURL,
  authDomain,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
} from '../env'

const config = {
  projectId,
  apiKey,
  databaseURL,
  authDomain,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
}

export default initializeApp(config)
