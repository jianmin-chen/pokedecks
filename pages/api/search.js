import config from '@/utils/config'
import { withIronSessionApiRoute } from 'iron-session/next'

export default withIronSessionApiRoute(
  async function handler(req, res) {
    if (!req.session || !req.session.user || !req.session.user.loggedIn)
      return res
        .status(401)
        .json({ success: false, message: 'Not logged in yet' })

    const { method } = req
    if (method != 'GET')
      return res.status(400).json({
        success: false,
        message: 'Invalid request method'
      })

    const { q } = req.query
    if (!q)
      return res.status(200).json({
        success: false,
        message: 'Query not provided'
      })

    try {
      let encoded = `q=name:${q}*`
      if (req.query.page) encoded += `&page=${req.query.page}`
      const results = await (
        await fetch(`https://api.pokemontcg.io/v2/cards?${encoded}`, {
          header: {
            'X-Api-Key': config.TCG_API_KEY
          }
        })
      ).json()
      if (results.error) throw new Error(results.error.message)
      else
        return res.status(200).json({
          success: true,
          results
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
