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

    const { id } = req.query
    if (!id)
      return res.status(200).json({
        success: false,
        message: "Card ID wasn't provided"
      })

    try {
      const card = await (
        await fetch(`https://api.pokemontcg.io/v2/cards/${id}`, {
          header: {
            'X-Api-Key': config.TCG_API_KEY
          }
        })
      ).json()
      if (card.error) throw new Error(card.error.message)
      else
        return res.status(200).json({
          success: true,
          card
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
