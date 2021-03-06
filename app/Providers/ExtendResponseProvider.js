'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class ExtendResponseProvider extends ServiceProvider {

  boot() {
    const Response = use('Adonis/Src/Response')

    Response.macro('apiSuccess', function (data, meta, message) {
      this.status(200).json({
        status: 200,
        type: 'success',
        message: message || 'Успешно',
        data: data,
        meta: meta
      })
    })

    Response.macro('apiError', function (message) {
      this.status(404).json({
        status: 404,
        type: 'error',
        message: message || 'Произошла ошибка'
      })
    })

    Response.macro('apiCreated', function (item, meta) {
      this.status(200).json({
        status: 200,
        type: 'success',
        message: 'Успешно созданно',
        data: item,
        meta: meta
      })
    })

    Response.macro('apiUpdated', function (item, meta) {
      this.status(200).json({
        status: 200,
        message: 'Успешно обновленно',
        data: item,
        meta: meta
      })
    })

    Response.macro('apiDeleted', function (data) {
      this.status(200).json({
        status: 200,
        message: 'Успешно удалено',
        data: data
      })
    })

    Response.macro('apiCollection', function (items, meta) {
      this.status(200).json({
        status: 200,
        message: 'Успешно получено',
        data: items,
        meta: meta
      })
    })
  }

}

module.exports = ExtendResponseProvider
