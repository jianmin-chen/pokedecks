import dbConnect from '@/database/connect'
import Deck from '@/database/services/deck.service'
import config from '@/utils/config'
import { withIronSessionApiRoute } from 'iron-session/next'

export default withIronSessionApiRoute(
  async function handler(req, res) {
    if (!req.session || !req.session.user || !req.session.user.loggedIn)
      return res
        .status(401)
        .json({ success: false, message: 'Not logged in yet' })

    const { method } = req
    if (method !== 'PATCH')
      return res.status(400).json({
        success: false,
        message: 'Invalid request method'
      })

    const { deckId, cardId } = req.body
    if (!deckId || !cardId)
      return res.status(400).json({
        success: false,
        message: "Deck ID wasn't provided"
      })

    try {
      await dbConnect()
      const deck = await Deck.findOne({ _id: deckId })
      if (deck.creator.toString() !== req.session.user.info._id)
        return res.status(401).json({
          success: false,
          message: 'View only deck'
        })
      const card = await (
        await fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`, {
          header: {
            'X-Api-Key': config.TCG_API_KEY
          }
        })
      ).json()
      if (card.error) throw new Error(card.error.message)
      else
        return res.status(200).json({
          success: true,
          deck: await deck.addCard(card.data)
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
