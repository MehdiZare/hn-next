'use client'

import { useState } from 'react'
import ScoreboardCard from '@/components/ScoreboardCard'
import PostTypeChart from '@/components/PostTypeChart'
import DailyActivityChart from '@/components/DailyActivityChart'
import TopList from '@/components/TopList'

export default function Home() {
    const [dateRange, setDateRange] = useState<string>('all')

    return (
        <div className="space-y-8">
            <ScoreboardCard />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-1 md:col-span-4">
                    <div className="bg-white shadow rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-2 text-hn-orange">Time Range</h2>
                        <select
                            className="w-full p-2 border rounded"
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <PostTypeChart dateRange={dateRange} />
                <DailyActivityChart dateRange={dateRange} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <TopList title="Top Posts" type="posts" dateRange={dateRange} />
                <TopList title="Top Users" type="users" dateRange={dateRange} />
            </div>
        </div>
    )
}