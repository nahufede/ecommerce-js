import { firebaseConfig } from "./config.js"

const app = firebase.initializeApp(firebaseConfig)

export const getFirebase = () => app

export const getFirestore = () => firebase.firestore(app)

export const storage = () => firebase.storage()

export const auth = () => firebase.auth()