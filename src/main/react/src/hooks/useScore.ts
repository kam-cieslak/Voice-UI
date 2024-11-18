import {GameScoreType, LeaderboardType} from "../types/User.ts";
import {apiWithConfig} from "../axios/config.ts";

export const useScore = () => {

    const sendScore = async(data: GameScoreType) => {
        try {
            await apiWithConfig.post("/game/score", data);
        } catch (error) {
            console.error(error);
        }
    }

    const getLeaderboard = async() => {
        try {
            const response = await apiWithConfig.get<LeaderboardType[]>("/game/score/leaderboard");
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    return {
        sendScore,
        getLeaderboard
    }

};