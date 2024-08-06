'use client'

import { useState, useEffect } from 'react'
import { getScoreboard, Scoreboard } from '@/utils/api'

interface ScoreboardCardProps {
    title: string
    dataKey: keyof Scoreboard
}

export default function ScoreboardCard({ title, dataKey }: ScoreboardCardProps) {
    const [scoreboard, setScoreboard] = useState<Scoreboard | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchScoreboard() {
            try {
                const data = await getScoreboard()
                setScoreboard(data)
            } catch (error) {
                console.error('Error fetching scoreboard:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchScoreboard()
    }, [])

    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2 text-hn-orange">{title}</h2>
            {loading ? (
                <p className="text-2xl font-bold animate-pulse">Loading...</p>
            ) : (
                <p className="text-2xl font-bold">
                    {scoreboard ? (
                        dataKey === 'last_pull_time'
                            ? new Date(scoreboard[dataKey]).toLocaleString()
                            : scoreboard[dataKey].toLocaleString()
                    ) : 'N/A'}
                </p>
            )}
        </div>
    )
}