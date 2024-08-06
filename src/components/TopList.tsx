'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getTopPosts, getTopUsers, TopPost, TopUser } from '@/utils/api'

interface TopListProps {
    title: string
    type: 'posts' | 'users'
    dateRange: string
    limit: number
}

export default function TopList({ title, type, dateRange, limit }: TopListProps) {
    const [items, setItems] = useState<TopPost[] | TopUser[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchItems() {
            setLoading(true)
            setError(null)
            try {
                const data = type === 'posts'
                    ? await getTopPosts(dateRange)
                    : await getTopUsers(dateRange)
                setItems(data.slice(0, limit))
            } catch (err) {
                console.error(`Error fetching ${type}:`, err)
                setError(`Failed to fetch ${type}`)
            } finally {
                setLoading(false)
            }
        }
        fetchItems()
    }, [type, dateRange, limit])

    if (loading) return <div className="card"><div className="card-header">{title}</div><p className="p-4">Loading...</p></div>
    if (error) return <div className="card"><div className="card-header">{title}</div><p className="text-red-500 p-4">{error}</p></div>
    if (items.length === 0) return <div className="card"><div className="card-header">{title}</div><p className="p-4">No items to display</p></div>

    return (
        <div className="card">
            <div className="card-header">{title}</div>
            <div className="p-4">
                <table className="w-full">
                    <tbody>
                    {items.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="py-2">
                                <Link
                                    href={type === 'posts' ? `/items/${(item as TopPost).id}` : `/users/${(item as TopUser).user_id}`}
                                    className="block w-full text-blue-600 hover:underline"
                                >
                                    <div className="flex justify-between items-center">
                                            <span className="truncate pr-2">
                                                {type === 'posts' ? (item as TopPost).title : (item as TopUser).user_id}
                                            </span>
                                        <span className="bg-hn-orange text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                                                {type === 'posts'
                                                    ? `${(item as TopPost).score} points`
                                                    : `${Math.round((item as TopUser).activity_score)} points`}
                                            </span>
                                    </div>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}