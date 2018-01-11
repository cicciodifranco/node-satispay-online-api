/**
 * `Bearer Token` error.
 * @api public
 */

export class BearerTokenError extends Error {
  constructor () {
    const message = 'Bearer Token is required'
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}




/**
 * `Invalid Params` error.
 * @constructor
 * @param {String} [paramName]
 */

export class RequiredParamError extends Error {
  constructor (paramName) {
    const message = paramName + ' is required'
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

