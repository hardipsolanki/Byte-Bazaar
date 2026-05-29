import { getReq, patchReq, postReq } from '@/services/axiosInstance';
import { AddAddressReq, AddAddressRes, Address, GetAddressesRes, UpdateAddress, UpdateAddressesRes, UpdateAddressReq } from '@/types/address';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'



// Define a type for the slice state
interface AddressState {
    addresses: Address[] | null;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

// create the thunk
export const addAddress = createAsyncThunk(
    'address/add',
    async (address: AddAddressReq, { rejectWithValue }) => {
        try {
            const response = await postReq<AddAddressReq, AddAddressRes>(
                "/api/v1/address/",
                address,
            )
            return response.data
        } catch (error: any) {
            console.log('Error while add address: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const getAddresses = createAsyncThunk(
    'address/user-addresses',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getReq<GetAddressesRes>("/api/v1/address/user-addresses")
            return response.data
        } catch (error: any) {
            console.log('Error while fetch adddresses: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)

export const updateAddress = createAsyncThunk(
    'address/update',
    async ({ addressId, data }: UpdateAddressReq, { rejectWithValue }) => {
        try {
            const response = await patchReq<UpdateAddress, UpdateAddressesRes>(
                `/api/v1/address/${addressId}`,
                data,
            )
            return response.data
        } catch (error: any) {
            console.log('Error while update address: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)

// Define the initial state using that type
const initialState: AddressState = {
    addresses: [],
    loading: 'idle'
}

export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // get addresses
            .addCase(getAddresses.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(getAddresses.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                state.addresses = payload.data
            })
            .addCase(getAddresses.rejected, (state) => {
                state.loading = 'failed'
            })
            // add addresses 
            .addCase(addAddress.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(addAddress.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                if (payload.data.isPrimary && state.addresses?.length) {
                    const primaryAddressIndex = state.addresses?.findIndex(add => add.isPrimary === true)
                    if (primaryAddressIndex !== -1) {
                        state.addresses[primaryAddressIndex].isPrimary = false
                    }
                }
                state.addresses?.push(payload.data)
            })
            .addCase(addAddress.rejected, (state) => {
                state.loading = 'failed'
            })
            // update address
            .addCase(updateAddress.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(updateAddress.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                if (state.addresses) {
                    if (payload.data.isPrimary) {
                        const primaryAddressIndex = state.addresses?.findIndex(add => add.isPrimary === true)
                        if (primaryAddressIndex !== -1) {
                            state.addresses[primaryAddressIndex].isPrimary = false
                        }
                    }

                    const findAddIndex = state.addresses?.findIndex(add => add._id === payload.data._id)
                    state.addresses.splice(findAddIndex, 1, payload.data)
                }
            })
            .addCase(updateAddress.rejected, (state) => {
                state.loading = 'failed'
            })
    }

})

export default addressSlice.reducer