// https://github.com/dommmel/cloudflare-workers-basic-auth/blob/master/index.js

const CREDENTIALS_REGEXP =
  /^ *(?:[Bb][Aa][Ss][Ii][Cc]) +([A-Za-z0-9._~+/-]+=*) *$/

/**
 * RegExp for basic auth user/pass
 *
 * user-pass   = userid ":" password
 * userid      = *<TEXT excluding ":">
 * password    = *TEXT
 */

const USER_PASS_REGEXP = /^([^:]*):(.*)$/

/**
 * Object to represent user credentials.
 */

interface Credentials {
  name: string
  pass: string
}

/**
 * Parse basic auth to object.
 */

const parseAuthHeader = function (string: string): Credentials | undefined {
  // parse header
  const match = CREDENTIALS_REGEXP.exec(string)

  if (!match) {
    return undefined
  }

  // decode user pass
  const userPass = USER_PASS_REGEXP.exec(atob(match[1]))

  if (!userPass) {
    return undefined
  }

  // return credentials object
  return { name: userPass[1], pass: userPass[2] }
}

const unauthorizedResponse = function (body: string) {
  return new Response(body, {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="User Visible Realm"',
    },
  })
}

export { parseAuthHeader, unauthorizedResponse }
