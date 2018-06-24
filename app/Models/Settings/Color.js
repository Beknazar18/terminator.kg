'use strict'

const Model = use('Model')
const Exceptions = use('App/Exceptions/BasicException')
/**
 * @swagger
 * definitions:
 *   Color:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *       code:
 *         type: string
 */

class Color extends Model {
  static get table() {
    return 'colors'
  }

  static get createdAtColumn() {
    return undefined
  }

  static get updatedAtColumn() {
    return undefined
  }

  exceptions(message, status, code) {
    throw new Exceptions(message, status, code)
  }
}

module.exports = Color
