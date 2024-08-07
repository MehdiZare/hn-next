import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getTopPosts, getTopUsers, TopPost, TopUser } from '@/utils/api';

type TopListProps = {
    title: string;
    type: 'posts' | 'users';
    dateRange: string;
    limit: number;
};

export default function TopList({ title, type, dateRange, limit }: TopListProps) {
    const [items, setItems] = useState<TopPost[] | TopUser[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (type === 'posts') {
                    const data = await getTopPosts(dateRange);
                    setItems(data.slice(0, limit));
                } else {
                    const data = await getTopUsers(dateRange);
                    setItems(data.slice(0, limit));
                }
            } catch (error) {
                console.error(`Error fetching ${type}:`, error);
            }
        };
        fetchData();
    }, [type, dateRange, limit]);

    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4 text-hn-orange">{title}</h2>
            <ul>
                {type === 'posts' ? (
                    (items as TopPost[]).map((item) => (
                        <li key={item.id} className="mb-2">
                            <Link href={`/items/${item.id}`}>
                                {item.title}
                            </Link>
                            <span className="ml-2 text-gray-500">
                                {item.score} points
                            </span>
                        </li>
                    ))
                ) : (
                    (items as TopUser[]).map((item) => (
                        <li key={item.id} className="mb-2">
                            <Link href={`/users/${item.id}`}>
                                {item.id}
                            </Link>
                            <span className="ml-2 text-gray-500">
                                {item.activity_score !== undefined
                                    ? `${Math.round(item.activity_score)} activity score`
                                    : `${item.karma} karma`}
                            </span>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}