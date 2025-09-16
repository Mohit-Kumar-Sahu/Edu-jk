export function getUserAchievements(userId: string): Promise<any>;
export function getLeaderboard(): Promise<any>;
export function addAchievement(userId: string, achievement: any): Promise<any>;
export function updatePoints(userId: string, points: number): Promise<any>;
