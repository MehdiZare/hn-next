import { getPostById, TopPost } from '@/utils/api'

export async function generateMetadata({ params }: { params: { id: string } }) {
    const post = await getPostById(params.id)
    return {
        title: post.title,
        description: `HN post with ${post.score} points`
    }
}

export default async function ItemPage({ params }: { params: { id: string } }) {
    const post: TopPost = await getPostById(params.id)

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <p className="mb-2">Score: {post.score} points</p>
            <p className="mb-2">By: {post.by}</p>
            <p className="mb-4">Date: {new Date(post.time).toLocaleString()}</p>
            {post.url && (
                <a href={post.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    Original link
                </a>
            )}
        </div>
    )
}