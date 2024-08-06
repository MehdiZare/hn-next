const BASE_URL = 'https://hackernews-back-a7c849c48513.herokuapp.com';

export interface Scoreboard {
    last_pull_time: string;
    items_count: number;
    users_count: number;
}

export interface PostType {
    type: string;
    count: number;
}

export interface DailyActivity {
    date: string;
    posts_count: number;
    comments_count: number;
}

export interface TopPost {
    id: number;
    title: string;
    score: number;
}

export interface TopUser {
    user_id: string;
    karma: number;
    submitted_count: number;
    activity_score: number;
}

async function fetchApi<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function getScoreboard(): Promise<Scoreboard> {
    return fetchApi<Scoreboard>('/statistics/scoreboard');
}

export async function getPostTypes(dateRange: string): Promise<PostType[]> {
    return fetchApi<PostType[]>(`/statistics/post_types/${dateRange}`);
}

export async function getDailyActivity(dateRange: string): Promise<DailyActivity[]> {
    return fetchApi<DailyActivity[]>(`/statistics/daily/${dateRange}`);
}

export async function getTopPosts(dateRange: string, limit: number = 5): Promise<TopPost[]> {
    return fetchApi<TopPost[]>(`/posts/top/${dateRange}?limit=${limit}`);
}

export async function getTopUsers(dateRange: string, limit: number = 5): Promise<TopUser[]> {
    return fetchApi<TopUser[]>(`/users/top/${dateRange}?limit=${limit}`);
}

export async function getUserDetails(userId: string): Promise<TopUser> {
    return fetchApi<TopUser>(`/users/${userId}`);
}

export async function getItemDetails(itemId: string): Promise<TopPost> {
    return fetchApi<TopPost>(`/items/${itemId}`);
}