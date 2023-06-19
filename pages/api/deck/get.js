import dbConnect from '@/database/connect'
import Deck from '@/database/services/deck.service'
import config from '@/utils/config'
import { withIronSessionApiRoute } from 'iron-session/next'

export default withIronSessionApiRoute(
  async function handler(req, res) {
    if (!req.session || !req.session.user || !req.session.user.loggedIn)
      return res.status(401).json({ success: false, message: 'Not logged in' })

    const { method } = req
    if (method !== 'GET')
      return res.status(400).json({
        success: false,
        message: 'Invalid request method'
      })

    const { id } = req.query

    try {
      await dbConnect()
      return res.status(200).json({
        success: true,
        deck: await Deck.findOne({ _id: id })
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        success: false,
        reason: err.toString()
      })
    }
  },
  {
    cookieName: config.AUTH_TOKEN,
    password: config.AUTH_PASSWORD,
    cookieOptions: {
      secure: config.NODE_ENV === 'production'
    }
  }
)
