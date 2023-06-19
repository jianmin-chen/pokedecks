import Deck from '../models/deck.model'

class DeckService {
  async create(data) {
    return await Deck.create(data)
  }

  async findOne(query) {
    return await Deck.findOne(query)
  }

  async deleteOne(query) {
    return await Deck.deleteOne(query)
  }
}

export default new DeckService()
