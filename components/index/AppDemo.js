import { useState } from 'react'

export default function AppDemo() {
  const [deck, setDeck] = useState({})
  const [activeCard, setActiveCard] = useState(null)

  return (
    <div className="grid grid-cols-12 border rounded-md shadow-lg p-14">
      <div className="col-span-2 flex flex-col gap-y-4"></div>
      <div className="col-span-10"></div>
    </div>
  )
}
