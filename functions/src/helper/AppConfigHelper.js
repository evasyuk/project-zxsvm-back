import * as ENV_VARS from './_AppConfigGenerated'

const JWT_TTL = ENV_VARS['JWT_TTL']
const JWT_SECRET = ENV_VARS['JWT_SECRET']
const BABEL_DISABLE_CACHE = ENV_VARS['BABEL_DISABLE_CACHE']
const DB_URL = ENV_VARS['DB_URL']

console.log('? JWT_TTL', JWT_TTL)
console.log('? DB_URL', DB_URL)

export {
  JWT_SECRET,
  JWT_TTL,
  BABEL_DISABLE_CACHE,
  DB_URL,
}
