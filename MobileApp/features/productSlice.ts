import { getReq } from '@/services/axiosInstance';
import { GetProductRes, GetProductsRes, Product, SingleProduct } from '@/types/product';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


// Define a type for the slice state
interface ProductState {
    products: Product[] | null
    totalProducts?: number,
    limit?: number,
    page?: number,
    totalPages?: number,
    pagingCounter?: number,
    hasPrevPage?: boolean,
    hasNextPage?: boolean;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    singleProduct?: SingleProduct
}

// create the thunk

export const getProducts = createAsyncThunk(
    'products/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getReq<GetProductsRes>("/api/v1/products")
            return response.data
        } catch (error: any) {
            console.log('Error while fetch products: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const getProductsByCategory = createAsyncThunk(
    'products/category/get',
    async (categorySlug: string, { rejectWithValue }) => {
        try {
            const response = await getReq<GetProductsRes>(`/api/v1/products/category/${categorySlug}`)
            return response.data
        } catch (error: any) {
            console.log('Error while fetch products by category: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const getProduct = createAsyncThunk(
    'products/product/get',
    async (slug: string, { rejectWithValue }) => {
        try {
            const response = await getReq<GetProductRes>(`/api/v1/products/${slug}`)
            return response.data
        } catch (error: any) {
            console.log('Error while fetch single product: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)



// Define the initial state using that type
const initialState: ProductState = {
    products: [],
    loading: 'idle'
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearSingleProduct: (state) => {
            state.singleProduct = undefined
        }
    },
    extraReducers: (builder) => {
        builder
           
            // get products
            .addCase(getProducts.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(getProducts.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                state.products = payload.data.products
                state.hasNextPage = payload.data.hasNextPage
                state.hasPrevPage = payload.data.hasNextPage
                state.limit = payload.data.limit
                state.page = payload.data.page
                state.pagingCounter = payload.data.pagingCounter
                state.totalPages = payload.data.totalPages
                state.totalProducts = payload.data.totalProducts
            })
            .addCase(getProducts.rejected, (state) => {
                state.loading = 'failed'
            })
            // get products by category
            .addCase(getProductsByCategory.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(getProductsByCategory.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                state.products = payload.data.products
                state.hasNextPage = payload.data.hasNextPage
                state.hasPrevPage = payload.data.hasNextPage
                state.limit = payload.data.limit
                state.page = payload.data.page
                state.pagingCounter = payload.data.pagingCounter
                state.totalPages = payload.data.totalPages
                state.totalProducts = payload.data.totalProducts
            })
            .addCase(getProductsByCategory.rejected, (state) => {
                state.loading = 'failed'
            })

            // get product
            .addCase(getProduct.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(getProduct.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                state.singleProduct = {
                    ...payload.data,
                    subImages: payload.data.subImages.length ? [...payload.data.subImages, payload.data.mainImage] : []
                }
            })
            .addCase(getProduct.rejected, (state) => {
                state.loading = 'failed'
            })
    }

})

export const { clearSingleProduct } = productSlice.actions
export default productSlice.reducer