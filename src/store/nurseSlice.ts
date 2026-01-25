import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { appService } from '../services/appApi/appService';

interface NurseState {
    completionScore: {
        genralInfoPercentage: number;
        resumePercentage: number;
        documentPercentage: number;
        experiencePercentage: number;
        skillsPercentage: number;
        licensePercentage: number;
    } | null;
    loading: boolean;
    error: string | null;
}

const initialState: NurseState = {
    completionScore: null,
    loading: false,
    error: null,
};

export const fetchCompletionScore = createAsyncThunk(
    'nurse/fetchCompletionScore',
    async (_, { rejectWithValue }) => {
        try {
            const response = await appService.getCompletionScore();
            const { success, data, message } = response.data;
            if (success) {
                return data;
            } else {
                return rejectWithValue(message || 'Failed to fetch completion score');
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Something went wrong');
        }
    }
);

const nurseSlice = createSlice({
    name: 'nurse',
    initialState,
    reducers: {
        clearNurseError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompletionScore.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCompletionScore.fulfilled, (state, action) => {
                state.loading = false;
                state.completionScore = action.payload;
            })
            .addCase(fetchCompletionScore.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearNurseError } = nurseSlice.actions;
export default nurseSlice.reducer;
