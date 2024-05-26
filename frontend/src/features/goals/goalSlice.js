import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// List Goals
export const listGoals = createAsyncThunk('goals/list', async (_,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.listGoals(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

// create new Goal
export const createGoal = createAsyncThunk('goals/create', async (goalData,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.createGoal(goalData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

export const goalSlice = createSlice({
    'name': 'goal',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(listGoals.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(listGoals.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload;
            })
            .addCase(listGoals.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.goals = action.payload;
            })
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload;
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.goals.push(action.payload);
            });
    }
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;