import {getUserDetails} from '@/utils/api'

export default function UserPage() {
    const params = useParams()
    const [user, setUser] = useState<TopUser | null>(null)

    useEffect(() => {
        async function fetchUser() {
            if (typeof params.id === 'string') {
                try {
                    const userData = await getUserDetails(params.id)
                    setUser(userData)
                } catch (error) {
                    console.error('Error fetching user:', error)
                }
            }
        }

        fetchUser()
    }, [params.id])

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4 text-hn-orange">{user.user_id}</h1>
            <p className="mb-2">Karma: {user.karma}</p>
            <p className="mb-2">Submitted Count: {user.submitted_count}</p>
            <p>Activity Score: {Math.round(user.activity_score)}</p>
        </div>
    )
}

