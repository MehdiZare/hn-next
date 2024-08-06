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
            <h1 className="text-4xl font-bold mb-8 text-hn-orange">HN Dashboard</h1>

            <ScoreboardCard />

            <div className="my-8">
                <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date Range
                </label>
                <select
                    id="dateRange"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-hn-orange focus:border-hn-orange sm:text-sm rounded-md"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                >
                    <option value="all">All time</option>
                    <option value="ytd">Year to date</option>
                    <option value="1m">This month</option>
                    <option value="7d">Last 7 days</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                <PostTypeChart dateRange={dateRange} />
                <DailyActivityChart dateRange={dateRange} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                <TopList title="Top Posts" type="posts" dateRange={dateRange} />
                <TopList title="Top Users" type="users" dateRange={dateRange} />
            </div>
        </div>
    )
}