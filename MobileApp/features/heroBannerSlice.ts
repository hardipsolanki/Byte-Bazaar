import { getReq } from '@/services/axiosInstance';
import { GetHeroBannersRes, HeroBaner } from '@/types/heroBanners';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'



// Define a type for the slice state
interface HeroBannerState {
    banners: HeroBaner[] | null;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

// create the thunk

export const getHeroBanners = createAsyncThunk(
    'banner/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getReq<GetHeroBannersRes>("/api/v1/hero-banners")
            return response.data
        } catch (error: any) {
            console.log('Error while fetch hero banners: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)


// Define the initial state using that type
const initialState: HeroBannerState = {
    banners: [],
    loading: 'idle'
}

export const bannerSlice = createSlice({
    name: 'hero-banners',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // get hero - banners
            .addCase(getHeroBanners.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(getHeroBanners.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                state.banners = payload.data
            })
            .addCase(getHeroBanners.rejected, (state) => {
                state.loading = 'failed'
            })
    }

})

export default bannerSlice.reducer