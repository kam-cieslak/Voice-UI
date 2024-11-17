import {GameScoreType} from "../types/User.ts";
import {apiWithConfig} from "../axios/config.ts";

export const useScore = () => {

    const sendScore = async(data: GameScoreType) => {
        try {
            await apiWithConfig.post("/game/score", data);
        } catch (error) {
            console.error(error);
        }
    }

    return {
        sendScore
    }

};