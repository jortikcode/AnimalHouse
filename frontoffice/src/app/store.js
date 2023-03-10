import { configureStore } from '@reduxjs/toolkit'
import { auth } from './usersSlice'
import { marketplace } from './productsSlice'
import { locations } from './locationsSlice'
import { posts } from './postsSlice'
import { bookings } from './servicesSlice'
import { leaderboard } from './leaderboardSlice'

export default configureStore({
  reducer: {
    auth,
    marketplace,
    locations,
    posts,
    bookings,
    leaderboard
  }
})