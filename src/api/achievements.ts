import axios from 'axios';

const API_BASE = '/api/achievements';

export function getUserAchievements(userId: string) {
  return axios.get(`${API_BASE}/user/${userId}`).then(res => res.data);
}

export function getLeaderboard() {
  return axios.get(`${API_BASE}/leaderboard`).then(res => res.data);
}

export function addAchievement(userId: string, achievement: any) {
  return axios.post(`${API_BASE}/user/${userId}/add`, achievement).then(res => res.data);
}

export function updatePoints(userId: string, points: number) {
  return axios.post(`${API_BASE}/user/${userId}/points`, { points }).then(res => res.data);
}
