'use strict'

const Model = use('App/Models/Basic')

/**
 * @swagger
 * definitions:
 *   Menu:
 *     type: object
 *     properties:
 *       parent_id:
 *         type: integer
 *       user_id:
 *         type: integer
 *       title:
 *         type: string
 *       link:
 *         type: string
 *       sort:
 *         type: integer
 * 
 */
class Menu extends Model {
}

module.exports = Menu