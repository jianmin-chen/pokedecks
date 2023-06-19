import dbConnect from '@/database/connect'
import User from '@/database/services/user.service'
import config from '@/utils/config'
import { withIronSessionApiRoute } from 'iron-session/next'

export default withIronSessionApiRoute(
  async function handler(req, res) {
    if (req.session && req.session.user && req.session.user.loggedIn)
      return res
        .status(200)
        .json({ success: true, message: 'Already logged in' })

    const { method } = req
    if (method != 'POST')
      return res.status(400).json({
        success: false,
        message: 'Invalid request method'
      })

    const { email, username, password } = req.body
    if (!email || !username || !password)
      return res.status(400).json({
        success: false,
        reason: "Email, username, or password wasn't provided"
      })

    try {
      await dbConnect()
      if ((await User.findOne({ email })) || (await User.findOne({ username })))
        return res.status(401).json({
          success: false,
          reason: 'Email or username already exists'
        })
      await User.create({ email, username, password })
      return res.status(200).json({ success: true })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        success: false,
        reason: 'Invalid signup attempt'
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
