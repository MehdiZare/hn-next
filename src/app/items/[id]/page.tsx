'use client'

import {useState, useEffect} from 'react'
import {useParams} from 'next/navigation'
import {getItemDetails, TopPost} from '@/utils/api'

export default function ItemPage() {
    const params = useParams()
    const [item, setItem] = useState<TopPost | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchItem() {
            if (typeof params.id === 'string') {
                try {
                    const itemData = await getItemDetails(params.id)
                    setItem(itemData)
                } catch (error) {
                    console.error('Error fetching item:', error)
                } finally {
                    setLoading(false)
                }
            }
        }

        fetchItem()
    }, [params.id])

    if (loading) {
        return <div className="text-center py-8">Loading...</div>
    }

    if (!item) {
        return <div className="text-center py-8">Item not found</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4 text-hn-orange">{item.title}</h1>
                <p className="mb-2">Score: {item.score}</p>
                <p className="mb-2">ID: {item.id}</p>
                <a href={`https://news.ycombinator.com/item?id=${item.id}`} target="_blank" rel="noopener noreferrer"
                   className="text-hn-orange hover:underline">
                    View on Hacker News
                </a>
            </div>
        </div>
    )
}