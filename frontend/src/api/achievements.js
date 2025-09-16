import axios from 'axios';

const API_BASE = '/api/achievements';

export async function getUserAchievements(userId) {
  try {
    const response = await axios.get(`${API_BASE}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    throw error;
  }
}

export async function getLeaderboard() {
  try {
    const response = await axios.get(`${API_BASE}/leaderboard`);
    return response.data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
}

export async function addAchievement(userId, achievement) {
  try {
    const response = await axios.post(`${API_BASE}/user/${userId}/add`, achievement);
    return response.data;
  } catch (error) {
    console.error('Error adding achievement:', error);
    throw error;
  }
}

export async function updatePoints(userId, points) {
  try {
    const response = await axios.post(`${API_BASE}/user/${userId}/points`, { points });
    return response.data;
  } catch (error) {
    console.error('Error updating points:', error);
    throw error;
  }
}
