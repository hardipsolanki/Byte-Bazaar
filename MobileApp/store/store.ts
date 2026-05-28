import { configureStore } from '@reduxjs/toolkit'
import userSlice from "@/features/authSlice"
import categorySlice from "@/features/categorySlice"
import productSlice from "@/features/productSlice"
import heroBannerSlice from "@/features/heroBannerSlice"
import ratingSlice from '@/features/ratingSlice'
import addressSlice from '@/features/addressSlice'
import cartSlice from '@/features/cartSlice'
import couponSlice from '@/features/couponSlice'
export const store = configureStore({
  reducer: {
    users: userSlice,
    categories: categorySlice,
    products: productSlice,
    heroBanners: heroBannerSlice,
    ratings: ratingSlice,
    addresses: addressSlice,
    cart: cartSlice,
    coupons: couponSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch