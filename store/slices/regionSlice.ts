import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegionState {
    selectedRegion: string;
}

const initialState: RegionState = {
    selectedRegion: '',
};

const regionSlice = createSlice({
    name: 'region',
    initialState,
    reducers: {
        setRegion: (state, action: PayloadAction<string>) => {
            state.selectedRegion = action.payload;
        },
    },
});

export const { setRegion } = regionSlice.actions;
export default regionSlice.reducer;