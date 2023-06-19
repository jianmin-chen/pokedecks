const AUTH_TOKEN = process.env.AUTH_TOKEN
if (!AUTH_TOKEN)
  throw new Error(
    'Please define the AUTH_TOKEN environment variable inside .env'
  )

const AUTH_PASSWORD = process.env.AUTH_PASSWORD
if (!AUTH_PASSWORD)
  throw new Error(
    'Please define the AUTH_PASSWORD environment variable inside .env'
  )

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI)
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  )

const NODE_ENV = process.env.NODE_ENV
if (!NODE_ENV)
  throw new Error('Please define the NODE_ENV environment variable inside .env')

const SALT_ROUNDS = process.env.SALT_ROUNDS
if (!SALT_ROUNDS)
  throw new Error(
    'Please define the SALT_ROUNDS environment variable inside .env'
  )

const TCG_API_KEY = process.env.TCG_API_KEY
if (!TCG_API_KEY)
  throw new Error(
    'Please define the TCG_API_KEY environment variable inside .env'
  )

export default {
  AUTH_TOKEN,
  AUTH_PASSWORD,
  MONGODB_URI,
  NODE_ENV,
  SALT_ROUNDS: Number(SALT_ROUNDS),
  TCG_API_KEY
}
