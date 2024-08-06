'use client'

import {useState, useEffect} from 'react'
import {getScoreboard, Scoreboard} from '@/utils/api'

export default function ScoreboardCard() {
    const [scoreboard, setScoreboard] = useState<Scoreboard | null>(null)


    useEffect(() => {
        async function fetchScoreboard() {
            try {
                const data = await getScoreboard()
                setScoreboard(data)
            } catch (error) {
                console.error('Error fetching scoreboard:', error)
            }
        }

        fetchScoreboard()
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white shadow rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2 text-hn-orange">Last Data Retrieval</h2>
                <p className="text-2xl font-bold">
                    {scoreboard ? new Date(scoreboard.last_pull_time).toLocaleString() : 'Loading...'}
                </p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2 text-hn-orange">Number of Items</h2>
                <p className="text-2xl font-bold">
                    {scoreboard ? scoreboard.items_count.toLocaleString() : 'Loading...'}
                </p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2 text-hn-orange">Number of Users</h2>
                <p className="text-2xl font-bold">
                    {scoreboard ? scoreboard.users_count.toLocaleString() : 'Loading...'}
                </p>
            </div>
        </div>
    )
}