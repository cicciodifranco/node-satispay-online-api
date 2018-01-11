import * as request from 'request-promise'
import { RequiredParamError, BearerTokenError } from './errors'
import Promise from 'bluebird'

/** Class Satispay */
class Satispay {
  /**
   * @constructor
   * @param bearerToken merchant bearer token
   */
  constructor (bearerToken) {
    if (typeof bearerToken === 'undefined') {
      throw new BearerTokenError()
    }
    this.bearerToken = bearerToken
  }

  /**
   * Create User create a user you want to send Charge request to. The user must be subscribed to satispay service.
   * Once you create a user you do not need to create it again but it is enough create a Charge with the user id used previously.
   * But don’t worry, if you do not store user id you can call again the Create a user and, for the same phone number, it will always return the same user id.
   * @param {object} options - options object
   * @param {string} options.idempotencyKey - The idempotency key
   * @param {string} options.phone
   * @return {Promise} promise resolve true or error
   */
  createUser (options) {
    if (!options.phone) {
      return Promise.reject(new RequiredParamError('phone'))
    }
    let headers = {
      'Authorization': 'Bearer ' + this.bearerToken
    }
    if (options.idempotencyKey) {
      headers['Idempotency-Key'] = options.idempotencyKey
    }
    return request.post({
      url: 'https://authservices.satispay.com/online/v1/users',
      headers: headers,
      body: {
        phone_number: options.phone
      },
      json: true
    }).then(res => JSON.parse(res))
  }
  /**
   * Get the list of Shop Users of a Online shop
   * @param options
   * @param {String} options.starting_after user id
   * @param {String} options.ending_before user id
   * @param {String} options.limit Default 20, max_value = 100, min_value = 1
   * @return user list array
   */
  getUserList (options) {
    if (!options.starting_after || !options.ending_before) {
      return Promise.reject(new RequiredParamError(!options.starting_after ? 'starting_after' : 'ending_before'))
    }
    let qs = {
      starting_after: options.starting_after,
      ending_before: options.ending_before
    }
    if (options.limit) {
      qs.limit = options.limit
    }
    return request.get({
      url: 'https://authservices.satispay.com/online/v1/users',
      headers: {
        'Authorization': 'Bearer ' + this.bearerToken
      },
      qs: qs
    }).then(res => JSON.parse(res))
  }

  /**
   * Get an user by id, by the way the only new information returned from this call is the user phone_number.
   * @param options
   * @param {String} options.id The user's id
   */
  getUser (options) {
    if (!options.id) {
      return Promise.reject(new RequiredParamError('id'))
    }
    return request.get({
      url: 'https://authservices.satispay.com/online/v1/users/' + options.id,
      headers: {
        'Authorization': 'Bearer ' + this.bearerToken
      }
    }).then(res => JSON.parse(res))
  }

  /**
   * Create charge
   * @param options
   * @param {String} options.idempotencyKey Idempotency key
   * @param {Boolean} options.skipPush Skip push notification
   * @param {String} options.user_id User's id
   * @param {String} options.description Charge description
   * @param {Number} options.amount Charge amount
   * @param {Boolean} options.required_success_email Succes email
   * @param {String} options.metadata Charge metadata
   * @param {Number} options.expire_in Time to expire charge request
   * @param {String} options.callback_url callback url
   */
  createCharge (options) {
    return request.post({
      url: 'https://authservices.satispay.com/online/v1/charges',
      headers: {
        'Authorization': 'Bearer ' + this.bearerToken,
        'Idempotency-Key': options.idempotencyKey || '',
        'Content-Type': 'application/json'
      },
      body: {
        user_id: options.user_id,
        description: options.description,
        currency: 'EUR',
        amount: options.amount,
        metadata: options.metadata,
        required_success_email: options.required_success_email,
        expire_in: options.expire_in,
        callback_url: options.callback_url
      },
      json: true
    }).then(res => JSON.parse(res));
  }

  /**
   * Get charge list
   * @param options
   * @param options.starting_after_timestamp
   * @param options.starting_after
   * @param options.ending_before
   * @param options.limit
   */
  getChargeList (options) {
    request.get({
      url: 'https://authservices.satispay.com/online/v1/charges',
      headers: {
        'Authorization': 'Bearer ' + this.bearerToken
      },
      qs: {
        starting_after_timestamp: options.starting_after_timestamp,
        starting_after: options.starting_after,
        ending_before: options.ending_before,
        limit: options.limit
      }
    }).then(res => JSON.parse(res));
  }

  /**
   * Get charge
   * @param options
   * @param options.id
   */
  getCharge (options) {
    request.get({
      url: 'https://authservices.satispay.com/online/v1/charges/' + options.id,
      headers: {
        'Authorization': 'Bearer ' + this.bearerToken
      }
    }).then(res => JSON.parse(res));
  }

  /**
   * Update charge
   * @param options
   * @param options.id
   * @param options.metadata
   * @param options.description
   * @param options.charge_state
   */
  updateCharge (options) {
    request.put({
      url: 'https://authservices.satispay.com/online/v1/charges/' + options.id,
      headers: {
        'Authorization': 'Bearer ' + this.bearerToken
      },
      body: {
        metadata: options.metadata,
        description: options.description,
        charge_state: options.charge_state
      },
      json: true
    })
      .then(res => JSON.parse(res));
  }
  /**
   * Create refund
   * @param options
   * @param options.charge_id
   * @param options.description
   * @param options.currency
   * @param options.amount
   * @param options.metadata
   * @param options.reason
   */
  createRefund (options) {
    request.post({
      url: 'https://authservices.satispay.com/online/v1/refunds',
      headers: {
        'Authorization': 'Bearer ' + this.bearerToken,
        'Idempotency-Key': options.idempotencyKey || ''
      },
      body: {
        charge_id: options.charge_id,
        description: options.description,
        currency: options.currency,
        amount: options.amount,
        metadata: options.metadata,
        reason: options.reason
      },
      json: true
    })
      .then(res => JSON.parse(res));
  }
  /**
   * Get refund
   * @param options
   * @param options.id
   */
  getRefund (options) {
    request.get({
      url: 'https://authservices.satispay.com/online/v1/refunds/' + options.id,
      headers: {
        'Authorization': 'Bearer ' + this.bearerToken
      }
    })
      .then(res => JSON.parse(res));
  }
  /**
   * Get refund list
   * @param options
   * @param options.starting_after
   * @param options.ending_before
   * @param options.limit
   * @param options.charge_id
   */
  getRefundList (options) {
    request.get({
      url: 'https://authservices.satispay.com/online/v1/refunds',
      headers: {
        'Authorization': 'Bearer ' + this.bearerToken
      },
      qs: {
        starting_after: options.starting_after,
        ending_before: options.ending_before,
        limit: options.limit,
        charge_id: options.charge_id
      }
    })
      .then(res => JSON.parse(res));
  }
  /**
   * Update refund
   * @param options
   * @param options.metadata
   */
  updateRefund (options) {
    request.put({
      url: 'https://authservices.satispay.com/online/v1/refunds/' + options.id,
      headers: {
        'Authorization': 'Bearer ' + this.bearerToken
      },
      body: {
        metadata: options.metadata
      },
      json: true
    })
      .then(res => JSON.parse(res));
  }
  /**
   * Get amount
   * @param options
   * @param options.starting_date
   * @param options.ending_date
   */
  getAmount (options) {
    request.get({
      url: 'https://authservices.satispay.com/online/v1/amounts',
      headers: {
        'Authorization': 'Bearer ' + this.bearerToken
      },
      qs: {
        starting_date: options.starting_date,
        ending_date: options.ending_date
      }
    })
      .then(res => JSON.parse(res))
  }

}

exports.Satispay = Satispay
