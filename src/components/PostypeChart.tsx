const BASE_URL = 'https://hackernews-back-a7c849c48513.herokuapp.com';

export async function fetchApi<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function getScoreboard() {
    return fetchApi<Scoreboard>('/statistics/scoreboard');
}

export async function getPostTypes(dateRange: string) {
    return fetchApi<PostType[]>(`/statistics/post_types/${dateRange}`);
}

export async function getDailyActivity(dateRange: string) {
    return fetchApi<DailyActivity[]>(`/statistics/daily/${dateRange}`);
}

export async function getTopPosts(dateRange: string, limit: number = 5) {
    return fetchApi<TopPost[]>(`/posts/top/${dateRange}?limit=${limit}`);
}

export async function getTopUsers(dateRange: string, limit: number = 5) {
    return fetchApi<TopUser[]>(`/users/top/${dateRange}?limit=${limit}`);
}

// Add types
interface Scoreboard {
    last_pull_time: string;
    items_count: number;
    users_count: number;
}

interface PostType {
    type: string;
    count: number;
}

interface DailyActivity {
    date: string;
    posts_count: number;
    comments_count: number;
}

interface TopPost {
    id: number;
    title: string;
    score: number;
}

interface TopUser {
    user_id: string;
    karma: number;
    submitted_count: number;
    activity_score: number;
}