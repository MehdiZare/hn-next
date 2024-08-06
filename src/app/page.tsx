'use client'

import { useState } from 'react'
import ScoreboardCard from '@/components/ScoreboardCard'
import PostTypeChart from '@/components/PostTypeChart'
import DailyActivityChart from '@/components/DailyActivityChart'
import TopList from '@/components/TopList'

export default function Home() {
    const [dateRange, setDateRange] = useState<string>('all')

    return (
        <div className="container mx-auto px-4 py-8">
            <nav className="bg-hn-orange mb-4 p-4">
                <div className="container">
                    <h1 className="text-2xl font-bold text-black">HN Dashboard</h1>
                </div>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <ScoreboardCard title="Last Data Retrieval" dataKey="last_pull_time" />
                <ScoreboardCard title="Number of Items" dataKey="items_count" />
                <ScoreboardCard title="Number of Users" dataKey="users_count" />
                <div className="bg-white shadow rounded-lg p-4">
                    <h2 className="text-lg font-semibold mb-2 text-hn-orange">Time Range</h2>
                    <select
                        id="dateRange"
                        className="w-full p-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-hn-orange"
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                    >
                        <option value="all">All time</option>
                        <option value="ytd">Year to date</option>
                        <option value="1m">This month</option>
                        <option value="7d">Last 7 days</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <PostTypeChart dateRange={dateRange} />
                <DailyActivityChart dateRange={dateRange} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <TopList title="Top Posts" type="posts" dateRange={dateRange} limit={5} />
                <TopList title="Top Users" type="users" dateRange={dateRange} limit={5} />
            </div>

            <footer className="mt-8 py-4 border-t-2 border-hn-orange">
                <div className="container text-center">
                    <p>Created by <a href="https://www.linkedin.com/in/mehdizare/" target="_blank" rel="noopener noreferrer" className="text-hn-orange hover:underline">Mehdi Zare</a></p>
                    <p className="text-sm mt-2">Disclaimer: This is an experimental project built out of curiosity. It is not officially affiliated with Y Combinator or Hacker News.</p>
                </div>
            </footer>
        </div>
    )
}