// src/utils/api.ts

const baseUrl = 'https://hackernews-back-a7c849c48513.herokuapp.com';

async function fetchApi(endpoint: string) {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return await response.json();
        } else {
            throw new Error("Oops, we haven't got JSON!");
        }
    } catch (error) {
        console.error(`Could not fetch data from ${endpoint}:`, error);
        throw error;
    }
}

export async function getScoreboard() {
    return fetchApi('/statistics/scoreboard');
}

export async function getTopPosts(dateRange: string) {
    // Fetch more posts than we need, we'll limit on the client side
    return fetchApi(`/posts/top/${dateRange}?limit=100`);
}

export async function getTopUsers(dateRange: string) {
    // Fetch more users than we need, we'll limit on the client side
    return fetchApi(`/users/top/${dateRange}?limit=100`);
}

export async function getPostTypes(dateRange: string) {
    return fetchApi(`/statistics/post_types/${dateRange}`);
}

export async function getDailyActivity(dateRange: string) {
    return fetchApi(`/statistics/daily/${dateRange}`);
}

export type Scoreboard = {
    last_pull_time: string;
    items_count: number;
    users_count: number;
};

export type TopPost = {
    id: number;
    title: string;
    score: number;
};

export type TopUser = {
    user_id: string;
    activity_score: number;
};

export type PostType = {
    type: string;
    count: number;
};

export type DailyActivity = {
    date: string;
    posts_count: number;
    comments_count: number;
};