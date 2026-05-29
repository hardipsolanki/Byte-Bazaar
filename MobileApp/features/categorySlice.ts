import { getReq } from '@/services/axiosInstance';
import { Category, GetCtgRes } from '@/types/category';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'



// Define a type for the slice state
interface CategoryState {
    catagories: Category[] | null;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

// create the thunk

export const getCategories = createAsyncThunk(
    'category/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getReq<GetCtgRes>("/api/v1/categories")
            return response.data
        } catch (error: any) {
            console.log('Error while fetch categories: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)


// Define the initial state using that type
const initialState: CategoryState = {
    catagories: [],
    loading: 'idle'
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // get categories
            .addCase(getCategories.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(getCategories.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                state.catagories = payload.data
            })
            .addCase(getCategories.rejected, (state) => {
                state.loading = 'failed'
            })
    }

})

export default categorySlice.reducer