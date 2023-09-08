import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  eventAPI  from "./../api/events"

const initialState = {
    eventList: []
}

export const fetchEvents = createAsyncThunk("event/fetchEventsStatus",
    async () => {
        try {
            const response = await eventAPI.fetchEvents
            return response.data;
        } catch (error) {
            return error.message;
        }
    })

const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchEvents.fulfilled, (state, action) => {
            state.eventList = action.payload;
        })
    }
})

export default eventSlice.reducer;