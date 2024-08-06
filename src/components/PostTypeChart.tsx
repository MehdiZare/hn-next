'use client'

import { useState, useEffect } from 'react'
import { getPostTypes, PostType } from '@/utils/api'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface PostTypeChartProps {
    dateRange: string
}

export default function PostTypeChart({ dateRange }: PostTypeChartProps) {
    const [postTypes, setPostTypes] = useState<PostType[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchPostTypes() {
            try {
                const data = await getPostTypes(dateRange)
                setPostTypes(data)
            } catch (error) {
                console.error('Error fetching post types:', error)
                setError('Failed to load post types')
            }
        }

        fetchPostTypes()
    }, [dateRange])

    if (error) {
        return (
            <div className="card">
                <h2 className="card-header">Post Type Distribution</h2>
                <p className="text-red-500 p-4">{error}</p>
            </div>
        )
    }

    if (postTypes.length === 0) {
        return (
            <div className="card">
                <h2 className="card-header">Post Type Distribution</h2>
                <p className="p-4">Loading...</p>
            </div>
        )
    }

    const chartData = {
        labels: postTypes.map(pt => pt.type),
        datasets: [
            {
                data: postTypes.map(pt => pt.count),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ]
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right' as const,
            }
        }
    }

    return (
        <div className="card">
            <h2 className="card-header">Post Type Distribution</h2>
            <div className="p-4" style={{ height: '300px' }}>
                <Pie data={chartData} options={options} />
            </div>
        </div>
    )
}