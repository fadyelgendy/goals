import axios from "axios";

const API_URL = "/api/goals/";

// List Goals
const listGoals = async (token) => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: "Bearer " + token
        }
    });

    return response.data;
}

// Create New Goal
const createGoal = async (goalData, token) => {
    const response = await axios.post(API_URL + 'create/', goalData, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

    return response.data;
}

const goalService = {
    listGoals,
    createGoal
};

export default goalService;
