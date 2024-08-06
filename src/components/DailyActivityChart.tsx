'use client'

import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { getDailyActivity, DailyActivity } from '@/utils/api'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface DailyActivityChartProps {
    dateRange: string
}

function aggregateData(data: DailyActivity[], aggregateBy: number): DailyActivity[] {
    return data.reduce((acc, current, index) => {
        if (index % aggregateBy === 0) {
            acc.push({
                date: current.date,
                posts_count: current.posts_count,
                comments_count: current.comments_count
            });
        } else {
            const last = acc[acc.length - 1];
            last.posts_count += current.posts_count;
            last.comments_count += current.comments_count;
        }
        return acc;
    }, [] as DailyActivity[]);
}

export default function DailyActivityChart({ dateRange }: DailyActivityChartProps) {
    const [dailyActivity, setDailyActivity] = useState<DailyActivity[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            setError(null)
            try {
                const data = await getDailyActivity(dateRange)
                let aggregatedData = data;
                if (data.length > 100) {
                    const aggregateBy = Math.ceil(data.length / 100);
                    aggregatedData = aggregateData(data, aggregateBy);
                }
                setDailyActivity(aggregatedData)
            } catch (err) {
                console.error('Error fetching daily activity:', err)
                setError('Failed to fetch daily activity data')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [dateRange])

    if (loading) return <div className="card"><div className="card-header">Daily Activity</div><p className="p-4">Loading daily activity data...</p></div>
    if (error) return <div className="card"><div className="card-header">Daily Activity</div><p className="text-red-500 p-4">{error}</p></div>
    if (dailyActivity.length === 0) return <div className="card"><div className="card-header">Daily Activity</div><p className="p-4">No daily activity data available</p></div>

    const chartData = {
        labels: dailyActivity.map(da => da.date),
        datasets: [
            {
                label: 'Posts',
                data: dailyActivity.map(da => da.posts_count),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Comments',
                data: dailyActivity.map(da => da.comments_count),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Daily Activity',
            },
        },
    }

    return (
        <div className="card">
            <div className="card-header">Daily Activity</div>
            <div className="p-4" style={{ height: '300px' }}>
                <Line options={options} data={chartData} />
            </div>
        </div>
    )
}