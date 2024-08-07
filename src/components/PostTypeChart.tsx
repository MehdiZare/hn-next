// src/components/PostTypeChart.tsx

import { useState, useEffect } from 'react'
import { getPostTypes, PostType } from '@/utils/api'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

type PostTypeChartProps = {
    dateRange: string
}

export default function PostTypeChart({ dateRange }: PostTypeChartProps) {
    const [postTypes, setPostTypes] = useState<PostType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPostTypes(dateRange)
                setPostTypes(data)
            } catch (error) {
                console.error('Error fetching post types:', error)
            }
        }
        fetchData()
    }, [dateRange])

    const data = {
        labels: postTypes.map(type => type.type),
        datasets: [
            {
                data: postTypes.map(type => type.count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4 text-hn-orange">Post Types</h2>
            <Pie data={data} />
        </div>
    )
}