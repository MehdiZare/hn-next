import { getUserById, TopUser } from '@/utils/api'

export async function generateMetadata({ params }: { params: { id: string } }) {
    const user = await getUserById(params.id)
    return {
        title: `User: ${user.user_id}`,
        description: `HN user with ${Math.round(user.activity_score)} activity score`
    }
}

export default async function UserPage({ params }: { params: { id: string } }) {
    const user: TopUser = await getUserById(params.id)

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">User: {user.user_id}</h1>
            <p className="mb-2">Activity Score: {Math.round(user.activity_score)}</p>
            <p className="mb-2">Karma: {user.karma}</p>
            <p className="mb-4">Created: {new Date(user.created).toLocaleString()}</p>
            <a href={`https://news.ycombinator.com/user?id=${user.user_id}`} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                View on Hacker News
            </a>
        </div>
    )
}