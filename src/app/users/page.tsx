import { getUserById, TopUser } from '@/utils/api'

export async function generateMetadata({ params }: { params: { id: string } }) {
    const user = await getUserById(params.id)
    if (!user) {
        return {
            title: 'User Not Found',
            description: 'The requested user could not be found.'
        }
    }
    return {
        title: `User: ${user.id}`,
        description: `HN user with ${user.karma} karma`
    }
}

export default async function UserPage({ params }: { params: { id: string } }) {
    const user = await getUserById(params.id)

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
                <p>The requested user could not be found.</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">User: {user.id}</h1>
            <p className="mb-2">Karma: {user.karma}</p>
            <p className="mb-2">Submitted Count: {user.submitted_count}</p>
            <p className="mb-4">Created: {new Date(user.created).toLocaleString()}</p>
            <a href={`https://news.ycombinator.com/user?id=${user.id}`} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                View on Hacker News
            </a>
        </div>
    )
}