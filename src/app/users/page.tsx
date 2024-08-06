'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getUserDetails, TopUser } from '@/utils/api'

export default function UserPage() {
    const params = useParams()
    const [user, setUser] = useState<TopUser | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchUser() {
            if (typeof params.id === 'string') {
                try {
                    const userData = await getUserDetails(params.id)
                    setUser(userData)
                } catch (error) {
                    console.error('Error fetching user:', error)
                } finally {
                    setLoading(false)
                }
            }
        }
        fetchUser()
    }, [params.id])

    if (loading) {
        return <div className="text-center py-8">Loading...</div>
    }

    if (!user) {
        return <div className="text-center py-8">User not found</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4 text-hn-orange">{user.user_id}</h1>
                <p className="mb-2">Karma: {user.karma}</p>
                <p className="mb-2">Submitted Count: {user.submitted_count}</p>
                <p className="mb-2">Activity Score: {Math.round(user.activity_score)}</p>
                <a href={`https://news.ycombinator.com/user?id=${user.user_id}`} target="_blank" rel="noopener noreferrer" className="text-hn-orange hover:underline">
                    View on Hacker News
                </a>
            </div>
        </div>
    )
}