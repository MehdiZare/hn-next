'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { TopPost } from '@/utils/api'

// Note: You'll need to create this function in your api.ts file
import { getItemDetails } from '@/utils/api'

export default function ItemPage() {
  const params = useParams()
  const [item, setItem] = useState<TopPost | null>(null)

  useEffect(() => {
    async function fetchItem() {
      if (typeof params.id === 'string') {
        try {
          const itemData = await getItemDetails(params.id)
          setItem(itemData)
        } catch (error) {
          console.error('Error fetching item:', error)
        }
      }
    }
    fetchItem()
  }, [params.id])

  if (!item) {
    return <div>Loading...</div>
  }

  return (
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-hn-orange">{item.title}</h1>
        <p className="mb-2">Score: {item.score}</p>
        <p className="mb-2">ID: {item.id}</p>
        {/* Add more item details as needed */}
      </div>
  )
}