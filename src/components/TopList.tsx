'use client'

import {useState, useEffect} from 'react'
import {getTopPosts, getTopUsers, TopPost, TopUser} from '@/utils/api'

interface TopListProps {
    title: string
    type: 'posts' | 'users'
    dateRange: string
}

export default function TopList({title, type, dateRange}: TopListProps) {
    const [items, setItems] = useState<TopPost[] | TopUser[]>([])

    useEffect(() => {
        async function fetchItems() {
            try {
                if (type === 'posts') {
                    const data = await getTopPosts(dateRange)
                    setItems(data)
                } else {
                    const data = await getTopUsers(dateRange)
                    setItems(data)
                }
            } catch (error) {
                console.error(`Error fetching ${type}:`, error)
            }
        }

        fetchItems()
    }, [type, dateRange])

    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
            <span className="text-sm">
              {type === 'posts' ? (item as TopPost).title : (item as TopUser).user_id}
            </span>
                        <span className="bg-hn-orange text-white px-2 py-1 rounded text-xs">
              {type === 'posts'
                  ? `${(item as TopPost).score} points`
                  : `${Math.round((item as TopUser).activity_score)} points`}
            </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
