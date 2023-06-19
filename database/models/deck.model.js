import mongoose from 'mongoose'
import './user.model'
import { format, valid, length, find } from '@/utils/utils'

const setSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      trim: true
    },
    set: {
      type: String,
      trim: true
    },
    number: {
      type: String
    },
    name: {
      type: String,
      trim: true
    },
    types: [
      {
        type: String,
        trim: true
      }
    ],
    subtypes: [
      {
        type: String,
        trim: true
      }
    ],
    rarity: {
      type: String,
      trim: true
    },
    images: {
      small: {
        type: String,
        trim: true
      },
      large: {
        type: String,
        trim: true
      }
    },
    qty: {
      type: Number,
      default: 1,
      max: 4
    }
  },
  { _id: false }
)

const deckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  pokemon: [setSchema],
  trainer: [setSchema],
  energy: [setSchema],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
})

deckSchema.methods.addCard = async function (card) {
  if (length(this.pokemon, this.trainer, this.energy) === 60)
    throw new Error('Max number of sixty cards reached')
  const supertype = format(card.supertype)
  const check = valid(card, supertype, this[supertype])
  if (!check.error) {
    // Valid card -> add card
    if (check.exists >= 0) this[supertype][check.exists].qty++
    else
      this[supertype].push({
        id: card.id,
        set: card.set.name,
        number: card.number,
        name: card.name,
        types: card.types,
        subtypes: card.subtypes,
        rarity: card.rarity,
        images: card.images
      })
    this.markModified(supertype)
    return await this.save()
  } else throw new Error(check.error)
}

deckSchema.methods.removeCard = async function (cardId, supertype) {
  const index = find(this[supertype], cardId)
  if (index === -1) throw new Error('Card not found')
  if (this[supertype][index].qty === 1) this[supertype].splice(index, 1)
  else this[supertype][index].qty--
  this.markModified(supertype)
  return await this.save()
}

export default mongoose.models.deck || mongoose.model('deck', deckSchema)
