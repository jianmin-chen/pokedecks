// Utilities for dealing with adding cards to deck
export function format(supertype) {
  if (supertype === 'Pokémon') return 'pokemon'
  else if (supertype === 'Energy') return 'energy'
  else return 'trainer'
}

export function find(cards, cardId) {
  return cards.findIndex(card => card.id === cardId)
}

export function length() {
  return Object.values(arguments)
    .flat()
    .reduce((total, card) => total + card.qty, 0)
}

export function valid(card, supertype, cards) {
  let check = {}
  const index = find(cards, card.id)
  if (index !== -1) {
    if (
      cards[index].qty == 4 &&
      (supertype === 'pokemon' || supertype == 'trainer')
    )
      return { error: 'Max of four cards reached' }
    // TODO: Add other checks
    check.exists = index
  }
  return check
}
