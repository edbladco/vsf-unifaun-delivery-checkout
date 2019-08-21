import { Router } from 'express'
import { apiStatus } from '../../../lib/util'

module.exports = ({ config, db }) => {
  const api = Router()
  api.get('/test', async (req, res) => {
    return apiStatus(res, {
      error: false
    })
  })

  return api
}
