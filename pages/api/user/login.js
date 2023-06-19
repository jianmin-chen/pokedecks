import dbConnect from '@/database/connect'
import User from '@/database/services/user.service'
import config from '@/utils/config'
import { withIronSessionApiRoute } from 'iron-session/next'

export default withIronSessionApiRoute(
  async function handler(req, res) {
    if (req.session && req.session.user && req.session.user.loggedIn)
      return res.status(200).json({
        success: true,
        message: 'Already logged in'
      })

    const { method } = req
    if (method != 'POST')
      return res.status(400).json({
        success: false,
        message: 'Invalid request method'
      })

    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({
        success: false,
        reason: "Email or password wasn't provided. Try again?"
      })

    try {
      await dbConnect()
      const match = await User.validate(email, password)
      if (!match)
        return res.status(401).json({
          success: false,
          reason: 'Invalid account, email, or password'
        })
      req.session.user = { loggedIn: true, info: { ...match } }
      await req.session.save()
      return res.status(200).json({ success: true })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        success: false,
        reason: 'Invalid login attempt'
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
