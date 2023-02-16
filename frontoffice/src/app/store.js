import { configureStore } from '@reduxjs/toolkit'
import { auth } from './usersSlice'
import { marketplace } from './productsSlice'
import { locations } from './locationsSlice'
import { posts } from './postsSlice'

export default configureStore({
  reducer: {
    auth,
    marketplace,
    locations,
    posts
  }
})