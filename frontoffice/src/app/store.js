import { configureStore } from '@reduxjs/toolkit'
import { auth } from './usersSlice'
import { marketplace } from './productsSlice'

export default configureStore({
  reducer: {
    auth,
    marketplace
  }
})