import { patchReq } from '@/services/axiosInstance';
import { ApplyCouponres, Coupon } from '@/types/coupon';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'



// Define a type for the slice state
interface CouponState {
    coupons: Coupon[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}


export const applyCoupon = createAsyncThunk(
    'admin/apply-coupon',
    async (couponCode: string, { rejectWithValue }) => {
        try {
            const response = await patchReq<{ couponCode: string }, ApplyCouponres>(
                "/api/v1/coupon/apply-coupon",
                { couponCode }
            )
            return {
                statusCode: response.data.statusCode,
                message: response.data.message,
                success: response.data.success
            }
        } catch (error: any) {
            console.log('Error while apply coupon: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    }
)

// Define the initial state using that type
const initialState: CouponState = {
    coupons: [],
    loading: 'idle'
}

export const couponSlice = createSlice({
    name: 'coupons-admin',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            // aply coupons
            .addCase(applyCoupon.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(applyCoupon.fulfilled, (state) => {
                state.loading = 'succeeded'
            })
            .addCase(applyCoupon.rejected, (state) => {
                state.loading = 'failed'
            })

    }


})

export default couponSlice.reducer