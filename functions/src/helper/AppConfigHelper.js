import * as ENV_VARS from './_AppConfigGenerated'

const JWT_TTL = ENV_VARS['JWT_TTL']
const JWT_SECRET = ENV_VARS['JWT_SECRET']
const BABEL_DISABLE_CACHE = ENV_VARS['BABEL_DISABLE_CACHE']
const DB_URL = ENV_VARS['DB_URL']

const URI = ENV_VARS['URI']
const URI2 = ENV_VARS['URI2']

export {
  JWT_SECRET,
  JWT_TTL,
  BABEL_DISABLE_CACHE,
  DB_URL,
  URI,
  URI2,
}
